import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { ConfigService } from '../../services/config.service';
import { VozService } from '../../services/voz.service';
import { FrasesPage } from '../../shared/frases-page';

@Component({
  selector: 'app-necessidades', templateUrl: './necessidades.page.html', styleUrls: ['./necessidades.page.scss'],
  standalone: true, imports: [IonicModule, CommonModule, RouterLink],
})
export class NecessidadesPage extends FrasesPage {
  override frases: Frase[] = [
    { texto: 'Estou com sede', icon: 'assets/icon/sede.png' },
    { texto: 'Estou com fome', icon: 'assets/icon/fome.png' },
    { texto: 'Preciso ir ao banheiro', icon: 'assets/icon/banheiro.png' },
    { texto: 'Preciso de ajuda', icon: 'assets/icon/ajuda.svg' },
    { texto: 'Estou perdido', icon: 'assets/icon/perdido.svg' },
    { texto: 'Eu te amo', icon: 'assets/icon/amor.svg' }
  ];
  constructor(favoritos: FavoritosService, config: ConfigService, voz: VozService) { super(favoritos, config, voz); }
}
