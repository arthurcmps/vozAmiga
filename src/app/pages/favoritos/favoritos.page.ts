import { Component } from '@angular/core';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { ConfigService } from '../../services/config.service';
import { VozService } from '../../services/voz.service';
import { FrasesPage } from '../../shared/frases-page';

@Component({ selector: 'app-favoritos', templateUrl: './favoritos.page.html', styleUrls: ['./favoritos.page.scss'], standalone: false })
export class FavoritosPage extends FrasesPage {
  carregando = true;
  constructor(favoritos: FavoritosService, config: ConfigService, voz: VozService) { super(favoritos, config, voz); }
  override async ionViewWillEnter(): Promise<void> {
    this.carregando = true;
    await super.ionViewWillEnter();
    this.carregando = false;
  }
  async removerFavorito(frase: Frase): Promise<void> {
    this.erro = '';
    try { await this.favoritosService.remover(frase); }
    catch { this.erro = 'Não foi possível remover o favorito. Tente novamente.'; }
  }
}
