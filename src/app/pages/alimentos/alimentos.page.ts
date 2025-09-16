import { Component } from '@angular/core';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.page.html',
  styleUrls: ['./alimentos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class AlimentosPage {
  frases: Frase[] = [
    { texto: 'Estou com fome', icon: 'assets/icon/fome.png' },
    { texto: 'Estou com sede', icon: 'assets/icon/sede.png' },
    { texto: 'Quero água', icon: 'assets/icon/agua.png' },
    { texto: 'Quero suco', icon: 'assets/icon/suco.png' },
    { texto: 'Quero leite', icon: 'assets/icon/leite.png' },
    { texto: 'Quero uma fruta', icon: 'assets/icon/fruta.png' }
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
