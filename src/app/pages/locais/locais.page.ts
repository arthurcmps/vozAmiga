import { Component } from '@angular/core';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-locais',
  templateUrl: './locais.page.html',
  styleUrls: ['./locais.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class LocaisPage {
  frases: Frase[] = [
    { texto: 'Casa', icon: 'assets/icon/casa.png' },
    { texto: 'Escola', icon: 'assets/icon/escola.png' },
    { texto: 'Hospital', icon: 'assets/icon/hospital.png' },
    { texto: 'Parque', icon: 'assets/icon/parque.png' },
    { texto: 'Supermercado', icon: 'assets/icon/supermercado.png' },
    { texto: 'Restaurante', icon: 'assets/icon/restaurante.png' }
  ];

  constructor(public favoritosService: FavoritosService, public configService: ConfigService) {}

  async falar(frase: Frase) {
    this.frases.forEach(f => f.selecionado = false);
    frase.selecionado = true;

    await TextToSpeech.speak({
      text: frase.texto,
      lang: 'pt-BR',
      rate: this.configService.rate,
      pitch: this.configService.pitch,
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

  get pictogramClass() {
    return `pictogram-${this.configService.pictogramSize}`;
  }
}
