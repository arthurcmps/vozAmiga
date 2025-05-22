import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';

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

  falar(texto: string) {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(texto);
    synth.speak(utterThis);
  }

  favoritar(frase: string) {
    this.favoritosService.adicionar(frase);
  }
}
