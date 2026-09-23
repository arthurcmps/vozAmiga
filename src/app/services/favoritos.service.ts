import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { normalizarIcone } from '../shared/pictogramas';

export interface Frase { texto: string; icon: string; selecionado?: boolean; }

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private subject = new BehaviorSubject<Frase[]>([]);
  readonly favoritos$ = this.subject.asObservable();
  private ready?: Promise<void>;
  private queue: Promise<void> = Promise.resolve();
  constructor(private storage: Storage) {}

  init(): Promise<void> {
    if (!this.ready) {
      this.ready = this.carregar().catch(error => { this.ready = undefined; throw error; });
    }
    return this.ready;
  }

  private async carregar(): Promise<void> {
    await this.storage.create();
    const dados: unknown = await this.storage.get('favoritos');
    // Keep the original device-local key: never discard existing favorites on logout.
    const validos = Array.isArray(dados) ? dados.filter((f): f is Frase =>
      !!f && typeof f.texto === 'string' && !!f.texto.trim() && typeof f.icon === 'string') : [];
    const unicos = new Map(validos.map(f => [f.texto, { texto: f.texto, icon: normalizarIcone(f.icon) }]));
    this.subject.next([...unicos.values()]);
  }

  getFavoritos(): Frase[] { return this.subject.value.map(f => ({ texto: f.texto, icon: f.icon })); }
  estaNosFavoritos(frase: Frase): boolean { return this.subject.value.some(f => f.texto === frase.texto); }

  private alterar(change: (frases: Frase[]) => Frase[]): Promise<void> {
    const task = this.queue.then(async () => {
      await this.init();
      const next = change(this.getFavoritos());
      await this.storage.set('favoritos', next);
      this.subject.next(next); // Publish only after persistence succeeds.
    });
    this.queue = task.catch(() => undefined); // One failure must not block future operations.
    return task;
  }
  adicionar(frase: Frase): Promise<void> {
    return this.alterar(list => list.some(f => f.texto === frase.texto) ? list :
      [...list, { texto: frase.texto, icon: normalizarIcone(frase.icon) }]);
  }
  remover(frase: Frase): Promise<void> { return this.alterar(list => list.filter(f => f.texto !== frase.texto)); }
  alternar(frase: Frase): Promise<void> {
    return this.alterar(list => list.some(f => f.texto === frase.texto)
      ? list.filter(f => f.texto !== frase.texto)
      : [...list, { texto: frase.texto, icon: normalizarIcone(frase.icon) }]);
  }
}
