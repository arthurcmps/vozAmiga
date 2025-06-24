import { Component } from '@angular/core';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-locais',
  templateUrl: './locais.page.html',
  styleUrls: ['./locais.page.scss'],
  standalone: false,
})
export class LocaisPage {
  frases: Frase[] = [
    { texto: 'Quero ir para casa', icon: 'assets/icon/casa.png' },
    { texto: 'Quero ir para escola', icon: 'assets/icon/escola.png' },
    { texto: 'Quero ir ao parquinho', icon: 'assets/icon/parquinho.png' },
    { texto: 'Quero ir à sala', icon: 'assets/icon/sala.png' },
    { texto: 'Quero ir ao quarto', icon: 'assets/icon/quarto.png' },
    { texto: 'Quero sair', icon: 'assets/icon/sair.png' }
  ];

  constructor(public favoritosService: FavoritosService) {}

  async falar(texto: string) {
    await TextToSpeech.speak({
      text: texto,
      lang: 'pt-BR',
      rate: 0.95,
      pitch: 1.05,
      volume: 1.0
    });
  }

  async alternarFavorito(frase: Frase) {
    if (this.favoritosService.estaNosFavoritos(frase)) {
      await this.favoritosService.remover(frase);
    } else {
      await this.favoritosService.adicionar(frase);
    }
  }

  estaNosFavoritos(frase: Frase): boolean {
    return this.favoritosService.estaNosFavoritos(frase);
  }
}
