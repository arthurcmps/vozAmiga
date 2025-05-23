import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-brincar',
  templateUrl: './brincar.page.html',
  styleUrls: ['./brincar.page.scss'],
  standalone: false,
})
export class BrincarPage {
  frases = [
    { texto: 'Quero brincar de bola', icon: 'assets/icon/bola.png' },
    { texto: 'Vamos desenhar', icon: 'assets/icon/desenhar.png' },
    { texto: 'Quero brincar de massinha', icon: 'assets/icon/massinha.png' },
    { texto: 'Vamos jogar juntos', icon: 'assets/icon/jogar.png' },
    { texto: 'Quero assistir desenho', icon: 'assets/icon/desenho.png' },
    { texto: 'Quero brincar de esconde-esconde', icon: 'assets/icon/esconde.png' }
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
