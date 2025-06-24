import { Component } from '@angular/core';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-necessidades',
  templateUrl: './necessidades.page.html',
  styleUrls: ['./necessidades.page.scss'],
  standalone: false,
})
export class NecessidadesPage {
  frases: Frase[] = [
    { texto: 'Quero ir ao banheiro', icon: 'assets/icon/banheiro.png' },
    { texto: 'Estou com sede', icon: 'assets/icon/sede.png' },
    { texto: 'Estou com fome', icon: 'assets/icon/fome.png' },
    { texto: 'Quero descansar', icon: 'assets/icon/descansar.png' },
    { texto: 'Estou com dor', icon: 'assets/icon/dor.png' },
    { texto: 'Estou com frio', icon: 'assets/icon/frio.png' }
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
