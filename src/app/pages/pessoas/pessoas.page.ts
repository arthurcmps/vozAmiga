import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { ConfigService } from '../../services/config.service';
import { VozService } from '../../services/voz.service';
import { FrasesPage } from '../../shared/frases-page';

@Component({
  selector: 'app-pessoas', templateUrl: './pessoas.page.html', styleUrls: ['./pessoas.page.scss'],
  standalone: true, imports: [IonicModule, CommonModule, RouterLink],
})
export class PessoasPage extends FrasesPage {
  override frases: Frase[] = [
    { texto: 'Oi, tudo bem?', icon: 'assets/icon/oi.svg' },
    { texto: 'Tchau', icon: 'assets/icon/tchau.svg' },
    { texto: 'Por favor', icon: 'assets/icon/por-favor.svg' },
    { texto: 'Com licença', icon: 'assets/icon/com-licenca.svg' },
    { texto: 'Me desculpe', icon: 'assets/icon/desculpa.svg' },
    { texto: 'Obrigado', icon: 'assets/icon/obrigado.svg' }
  ];
  constructor(favoritos: FavoritosService, config: ConfigService, voz: VozService) { super(favoritos, config, voz); }
}
