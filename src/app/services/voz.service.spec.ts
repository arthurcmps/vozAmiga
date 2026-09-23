import { ConfigService } from './config.service';
import { VozService } from './voz.service';

describe('VozService', () => {
  it('applies updated preferences to speech in Portuguese', async () => {
    const engine = { stop: jasmine.createSpy('stop').and.resolveTo(), speak: jasmine.createSpy('speak').and.resolveTo() };
    const speak = engine.speak;
    const config = { rate: .7, pitch: 1.4 } as ConfigService;
    await new VozService(config, engine).falar('Quero água');
    expect(speak).toHaveBeenCalledWith({ text: 'Quero água', lang: 'pt-BR', rate: .7, pitch: 1.4, volume: 1 });
  });
  it('cancels older requests when taps arrive rapidly', async () => {
    const engine = { stop: jasmine.createSpy('stop').and.resolveTo(), speak: jasmine.createSpy('speak').and.resolveTo() };
    const speak = engine.speak;
    const service = new VozService({ rate: 1, pitch: 1 } as ConfigService, engine);
    await Promise.all([service.falar('primeira'), service.falar('segunda')]);
    expect(speak).toHaveBeenCalledTimes(1);
    expect(speak.calls.mostRecent().args[0].text).toBe('segunda');
  });
});
