import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.page.html',
  styleUrls: ['./pessoas.page.scss'],
  standalone: false,
})
export class PessoasPage {
  frases = [
    { texto: 'Quero falar com a mamãe', icon: 'assets/icon/mamae.png' },
    { texto: 'Quero falar com o papai', icon: 'assets/icon/papai.png' },
    { texto: 'Quero falar com a professora', icon: 'assets/icon/professora.png' },
    { texto: 'Quero falar com o amigo', icon: 'assets/icon/amigo.png' },
    { texto: 'Quero ficar sozinho', icon: 'assets/icon/sozinho.png' },
    { texto: 'Quero um abraço', icon: 'assets/icon/abraco.png' }
  ];

  constructor(private favoritosService: FavoritosService) {}

  async falar(texto: string) {
    await TextToSpeech.speak({
      text: texto,
      lang: 'pt-BR',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0
    });
  }

  favoritar(frase: string) {
    this.favoritosService.adicionar(frase);
  }
}
