import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-locais',
  templateUrl: './locais.page.html',
  styleUrls: ['./locais.page.scss'],
  standalone: false,
})
export class LocaisPage {
  frases = [
    { texto: 'Quero ir para casa', icon: 'assets/icon/casa.png' },
    { texto: 'Quero ir para escola', icon: 'assets/icon/escola.png' },
    { texto: 'Quero ir ao parquinho', icon: 'assets/icon/parquinho.png' },
    { texto: 'Quero ir à sala', icon: 'assets/icon/sala.png' },
    { texto: 'Quero ir ao quarto', icon: 'assets/icon/quarto.png' },
    { texto: 'Quero sair', icon: 'assets/icon/sair.png' }
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
