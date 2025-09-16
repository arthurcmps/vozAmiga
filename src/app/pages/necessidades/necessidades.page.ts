import { Component } from '@angular/core';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-necessidades',
  templateUrl: './necessidades.page.html',
  styleUrls: ['./necessidades.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class NecessidadesPage {
  frases: Frase[] = [
    { texto: 'Estou com sede', icon: 'assets/icon/sede.png' },
    { texto: 'Estou com fome', icon: 'assets/icon/fome.png' },
    { texto: 'Preciso ir ao banheiro', icon: 'assets/icon/banheiro.png' },
    { texto: 'Preciso de ajuda', icon: 'assets/icon/ajuda.png' },
    { texto: 'Estou perdido', icon: 'assets/icon/perdido.png' },
    { texto: 'Eu te amo', icon: 'assets/icon/amor.png' }
  ];

  constructor(public favoritosService: FavoritosService) {}

  async falar(frase: Frase) {
    this.frases.forEach(f => f.selecionado = false);
    frase.selecionado = true;

    await TextToSpeech.speak({
      text: frase.texto,
      lang: 'pt-BR',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0
    });

    setTimeout(() => {
      frase.selecionado = false;
    }, 1000);
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
