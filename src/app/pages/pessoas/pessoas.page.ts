import { Component } from '@angular/core';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.page.html',
  styleUrls: ['./pessoas.page.scss'],
  standalone: false,
})
export class PessoasPage {
  frases: Frase[] = [
    { texto: 'Quero falar com a mamãe', icon: 'assets/icon/mamae.png' },
    { texto: 'Quero falar com o papai', icon: 'assets/icon/papai.png' },
    { texto: 'Quero falar com a professora', icon: 'assets/icon/professora.png' },
    { texto: 'Quero falar com o amigo', icon: 'assets/icon/amigo.png' },
    { texto: 'Quero ficar sozinho', icon: 'assets/icon/sozinho.png' },
    { texto: 'Quero um abraço', icon: 'assets/icon/abraco.png' }
  ];

  constructor(public favoritosService: FavoritosService) {}

  async falar(texto: string) {
    await TextToSpeech.speak({
      text: texto,
      lang: 'pt-BR',
      rate: 1.0,
      pitch: 1.0,
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
