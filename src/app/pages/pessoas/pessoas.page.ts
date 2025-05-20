import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.page.html',
  styleUrls: ['./pessoas.page.scss'],
  standalone: false,
})
export class PessoasPage {
  pessoas = [
    { texto: 'Quero falar com a mamãe', icon: 'assets/icon/mamae.png' },
    { texto: 'Quero falar com o papai', icon: 'assets/icon/papai.png' },
    { texto: 'Quero falar com a professora', icon: 'assets/icon/professora.png' },
    { texto: 'Quero falar com o amigo', icon: 'assets/icon/amigo.png' },
    { texto: 'Quero ficar sozinho', icon: 'assets/icon/sozinho.png' },
    { texto: 'Quero um abraço', icon: 'assets/icon/abraco.png' }
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
