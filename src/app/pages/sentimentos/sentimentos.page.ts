import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-sentimentos',
  templateUrl: './sentimentos.page.html',
  styleUrls: ['./sentimentos.page.scss'],
  standalone: false,
})
export class SentimentosPage {
  frases = [
    { texto: 'Estou feliz', icon: 'assets/icon/feliz.png' },
    { texto: 'Estou triste', icon: 'assets/icon/triste.png' },
    { texto: 'Estou com raiva', icon: 'assets/icon/raiva.png' },
    { texto: 'Estou com medo', icon: 'assets/icon/medo.png' },
    { texto: 'Estou cansado', icon: 'assets/icon/cansado.png' },
    { texto: 'Estou animado', icon: 'assets/icon/animado.png' }
  ];

  constructor(private favoritosService: FavoritosService) {}

  async falar(texto: string) {
    await TextToSpeech.speak({
      text: texto,
      lang: 'pt-BR',
      rate: 0.95,
      pitch: 1.05,
      volume: 1.0
    });
  }

  favoritar(frase: string) {
    this.favoritosService.adicionar(frase);
  }
}
