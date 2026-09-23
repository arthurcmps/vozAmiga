import { Inject, Injectable, InjectionToken } from '@angular/core';
import { TextToSpeech, TextToSpeechPlugin } from '@capacitor-community/text-to-speech';
import { ConfigService } from './config.service';

export const VOZ_ENGINE = new InjectionToken<Pick<TextToSpeechPlugin, 'speak' | 'stop'>>('VOZ_ENGINE', {
  providedIn: 'root', factory: () => TextToSpeech,
});

@Injectable({ providedIn: 'root' })
export class VozService {
  private request = 0;
  constructor(private config: ConfigService, @Inject(VOZ_ENGINE) private engine: Pick<TextToSpeechPlugin, 'speak' | 'stop'>) {}
  async falar(texto: string): Promise<void> {
    const request = ++this.request;
    await this.engine.stop();
    if (request !== this.request) return;
    await this.engine.speak({ text: texto, lang: 'pt-BR', rate: this.config.rate,
      pitch: this.config.pitch, volume: 1 });
  }
  async parar(): Promise<void> { ++this.request; await this.engine.stop(); }
}
