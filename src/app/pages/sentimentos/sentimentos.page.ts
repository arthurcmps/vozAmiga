import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';

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

  falar(texto: string) {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(texto);
    synth.speak(utterThis);
  }

  favoritar(frase: string) {
    this.favoritosService.adicionar(frase);
  }
}
