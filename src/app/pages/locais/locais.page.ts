import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { ConfigService } from '../../services/config.service';
import { VozService } from '../../services/voz.service';
import { FrasesPage } from '../../shared/frases-page';

@Component({
  selector: 'app-locais', templateUrl: './locais.page.html', styleUrls: ['./locais.page.scss'],
  standalone: true, imports: [IonicModule, CommonModule, RouterLink],
})
export class LocaisPage extends FrasesPage {
  override frases: Frase[] = [
    { texto: 'Casa', icon: 'assets/icon/casa.png' },
    { texto: 'Escola', icon: 'assets/icon/escola.png' },
    { texto: 'Hospital', icon: 'assets/icon/hospital.svg' },
    { texto: 'Parque', icon: 'assets/icon/parque.svg' },
    { texto: 'Supermercado', icon: 'assets/icon/supermercado.svg' },
    { texto: 'Restaurante', icon: 'assets/icon/restaurante.svg' }
  ];
  constructor(favoritos: FavoritosService, config: ConfigService, voz: VozService) { super(favoritos, config, voz); }
}
