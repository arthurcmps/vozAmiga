import { Component } from '@angular/core';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.page.html',
  styleUrls: ['./pessoas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class PessoasPage {
  frases: Frase[] = [
    { texto: 'Oi, tudo bem?', icon: 'assets/icon/oi.png' },
    { texto: 'Tchau', icon: 'assets/icon/tchau.png' },
    { texto: 'Por favor', icon: 'assets/icon/por-favor.png' },
    { texto: 'Com licença', icon: 'assets/icon/com-licenca.png' },
    { texto: 'Me desculpe', icon: 'assets/icon/desculpa.png' },
    { texto: 'Obrigado', icon: 'assets/icon/obrigado.png' }
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
