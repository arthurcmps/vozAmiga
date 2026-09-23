import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { ConfigService } from '../../services/config.service';
import { VozService } from '../../services/voz.service';
import { FrasesPage } from '../../shared/frases-page';

@Component({
  selector: 'app-alimentos', templateUrl: './alimentos.page.html', styleUrls: ['./alimentos.page.scss'],
  standalone: true, imports: [IonicModule, CommonModule, RouterLink],
})
export class AlimentosPage extends FrasesPage {
  override frases: Frase[] = [
    { texto: 'Estou com fome', icon: 'assets/icon/fome.png' },
    { texto: 'Estou com sede', icon: 'assets/icon/sede.png' },
    { texto: 'Quero água', icon: 'assets/icon/agua.png' },
    { texto: 'Quero suco', icon: 'assets/icon/suco.png' },
    { texto: 'Quero leite', icon: 'assets/icon/leite.svg' },
    { texto: 'Quero uma fruta', icon: 'assets/icon/fruta.png' }
  ];
  constructor(favoritos: FavoritosService, config: ConfigService, voz: VozService) { super(favoritos, config, voz); }
}
