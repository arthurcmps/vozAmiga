import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { ConfigService } from '../../services/config.service';
import { VozService } from '../../services/voz.service';
import { FrasesPage } from '../../shared/frases-page';

@Component({
  selector: 'app-sentimentos', templateUrl: './sentimentos.page.html', styleUrls: ['./sentimentos.page.scss'],
  standalone: true, imports: [IonicModule, CommonModule, RouterLink],
})
export class SentimentosPage extends FrasesPage {
  override frases: Frase[] = [
    { texto: 'Estou feliz', icon: 'assets/icon/feliz.png' },
    { texto: 'Estou triste', icon: 'assets/icon/triste.png' },
    { texto: 'Estou com raiva', icon: 'assets/icon/raiva.png' },
    { texto: 'Estou com medo', icon: 'assets/icon/medo.png' },
    { texto: 'Estou cansado', icon: 'assets/icon/cansado.png' },
    { texto: 'Estou entediado', icon: 'assets/icon/entediado.svg' }
  ];
  constructor(favoritos: FavoritosService, config: ConfigService, voz: VozService) { super(favoritos, config, voz); }
}
