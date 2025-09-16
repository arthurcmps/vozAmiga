import { Component } from '@angular/core';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-brincar',
  templateUrl: './brincar.page.html',
  styleUrls: ['./brincar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class BrincarPage {
  frases: Frase[] = [
    { texto: 'Vamos brincar?', icon: 'assets/icon/brincar.png' },
    { texto: 'Meus brinquedos', icon: 'assets/icon/brinquedos.png' },
    { texto: 'Quebra-cabeça', icon: 'assets/icon/quebra-cabeca.png' },
    { texto: 'Assistir TV', icon: 'assets/icon/tv.png' },
    { texto: 'Ouvir música', icon: 'assets/icon/musica.png' },
    { texto: 'Ler uma história', icon: 'assets/icon/livro.png' }
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
