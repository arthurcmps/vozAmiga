import { Directive } from '@angular/core';
import { FavoritosService, Frase } from '../services/favoritos.service';
import { ConfigService } from '../services/config.service';
import { VozService } from '../services/voz.service';

@Directive()
export abstract class FrasesPage {
  frases: Frase[] = [];
  erro = '';
  private speaking = 0;
  private ativa?: Frase;
  constructor(public favoritosService: FavoritosService, public configService: ConfigService, protected voz: VozService) {}
  async ionViewWillEnter(): Promise<void> {
    this.erro = '';
    try { await this.favoritosService.init(); }
    catch { this.erro = 'Não foi possível carregar os favoritos. Tente abrir a página novamente.'; }
  }
  ionViewWillLeave(): void {
    ++this.speaking;
    if (this.ativa) this.ativa.selecionado = false;
    this.frases.forEach(f => f.selecionado = false);
    void this.voz.parar().catch(() => undefined);
  }
  async falar(frase: Frase): Promise<void> {
    const speaking = ++this.speaking;
    this.erro = '';
    this.frases.forEach(f => f.selecionado = false);
    if (this.ativa) this.ativa.selecionado = false;
    this.ativa = frase;
    frase.selecionado = true;
    try { await this.voz.falar(frase.texto); }
    catch { if (speaking === this.speaking) this.erro = 'Não foi possível reproduzir a voz. Confira se há uma voz em português instalada e tente novamente.'; }
    finally { if (speaking === this.speaking) frase.selecionado = false; }
  }
  async alternarFavorito(frase: Frase): Promise<void> {
    this.erro = '';
    try { await this.favoritosService.alternar(frase); }
    catch { this.erro = 'Não foi possível salvar os favoritos. Tente novamente.'; }
  }
  estaNosFavoritos(frase: Frase): boolean { return this.favoritosService.estaNosFavoritos(frase); }
  get pictogramClass(): string { return `pictogram-${this.configService.pictogramSize}`; }
}
