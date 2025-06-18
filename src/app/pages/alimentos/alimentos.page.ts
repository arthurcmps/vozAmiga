import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.page.html',
  styleUrls: ['./alimentos.page.scss'],
  standalone: false,
})
export class AlimentosPage {
  frases = [
    { texto: 'Quero comer.', icon: 'assets/icon/comer.png' },
    { texto: 'Estou com fome.', icon: 'assets/icon/fome.png' },
    { texto: 'Estou comendo.', icon: 'assets/icon/comendo.png' },
    { texto: 'Quero arroz.', icon: 'assets/icon/arroz.png' },
    { texto: 'Quero carne.', icon: 'assets/icon/carne.png' },
    { texto: 'Quero feijão.', icon: 'assets/icon/feijao.png' },
    { texto: 'Quero pão.', icon: 'assets/icon/pao.png' },
    { texto: 'Quero fruta.', icon: 'assets/icon/fruta.png' },
    { texto: 'Não gosto disso.', icon: 'assets/icon/naogosto.png' },
    { texto: 'Está gostoso.', icon: 'assets/icon/gostoso.png' },
    { texto: 'Estou satisfeito.', icon: 'assets/icon/satisfeito.png' },
    { texto: 'Quero beber.', icon: 'assets/icon/beber.png' },
    { texto: 'Estou com sede.', icon: 'assets/icon/sede.png' },
    { texto: 'Quero suco.', icon: 'assets/icon/suco.png' },
    { texto: 'Quero água.', icon: 'assets/icon/agua.png' },
    { texto: 'Não quero mais.', icon: 'assets/icon/naoquero.png' },
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
