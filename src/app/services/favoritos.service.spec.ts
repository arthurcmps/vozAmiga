import { Storage } from '@ionic/storage-angular';
import { FavoritosService, Frase } from './favoritos.service';

describe('FavoritosService recovery', () => {
  const agua: Frase = { texto: 'Quero água', icon: 'assets/icon/agua.png' };
  const leite: Frase = { texto: 'Quero leite', icon: 'assets/icon/leite.png' };
  let data: unknown;
  let storage: jasmine.SpyObj<Storage>;
  let service: FavoritosService;
  beforeEach(() => {
    data = [];
    storage = jasmine.createSpyObj('Storage', ['create', 'get', 'set']);
    storage.create.and.resolveTo(storage);
    storage.get.and.callFake(async () => data);
    storage.set.and.callFake(async (_key: string, value: unknown) => { data = JSON.parse(JSON.stringify(value)); return value; });
    service = new FavoritosService(storage);
  });
  it('awaits initialization before first addition and preserves existing data', async () => {
    data = [agua];
    await service.adicionar(leite);
    expect(service.getFavoritos().map(f => f.texto)).toEqual([agua.texto, leite.texto]);
    expect(storage.create).toHaveBeenCalledTimes(1);
  });
  it('normalizes old broken image paths and duplicate records without losing phrases', async () => {
    data = [leite, leite, null, { texto: 42 }];
    await service.init();
    expect(service.getFavoritos()).toEqual([{ ...leite, icon: 'assets/icon/leite.svg' }]);
  });
  it('serializes rapid toggles without lost updates', async () => {
    await Promise.all([service.alternar(agua), service.alternar(leite), service.alternar(agua)]);
    expect(service.getFavoritos().map(f => f.texto)).toEqual([leite.texto]);
    expect(data).toEqual(service.getFavoritos());
  });
  it('does not resurrect a removed favorite after another addition', async () => {
    await service.adicionar(agua);
    await service.remover(agua);
    await service.adicionar(leite);
    expect(service.estaNosFavoritos(agua)).toBeFalse();
    const reopened = new FavoritosService(storage);
    await reopened.init();
    expect(reopened.getFavoritos()).toEqual(service.getFavoritos());
  });
  it('keeps memory consistent on write failure and permits retry', async () => {
    await service.init();
    storage.set.and.rejectWith(new Error('full'));
    await expectAsync(service.adicionar(agua)).toBeRejected();
    expect(service.getFavoritos()).toEqual([]);
    storage.set.and.resolveTo(undefined);
    await service.adicionar(agua);
    expect(service.estaNosFavoritos(agua)).toBeTrue();
  });
  it('retries storage initialization after failure', async () => {
    storage.get.and.rejectWith(new Error('unavailable'));
    await expectAsync(service.init()).toBeRejected();
    storage.get.and.resolveTo([agua]);
    await service.init();
    expect(service.estaNosFavoritos(agua)).toBeTrue();
  });
});
