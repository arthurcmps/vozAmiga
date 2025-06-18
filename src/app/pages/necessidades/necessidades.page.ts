import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-necessidades',
  templateUrl: './necessidades.page.html',
  styleUrls: ['./necessidades.page.scss'],
  standalone: false,
})
export class NecessidadesPage {
  frases = [
    { texto: 'Quero ir ao banheiro', icon: 'assets/icon/banheiro.png' },
    { texto: 'Estou com sede', icon: 'assets/icon/sede.png' },
    { texto: 'Estou com fome', icon: 'assets/icon/fome.png' },
    { texto: 'Quero descansar', icon: 'assets/icon/descansar.png' },
    { texto: 'Estou com dor', icon: 'assets/icon/dor.png' },
    { texto: 'Estou com frio', icon: 'assets/icon/frio.png' }
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
