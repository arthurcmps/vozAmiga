import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritosService, Frase } from '../../services/favoritos.service';
import { ConfigService } from '../../services/config.service';
import { VozService } from '../../services/voz.service';
import { FrasesPage } from '../../shared/frases-page';

@Component({
  selector: 'app-brincar', templateUrl: './brincar.page.html', styleUrls: ['./brincar.page.scss'],
  standalone: true, imports: [IonicModule, CommonModule, RouterLink],
})
export class BrincarPage extends FrasesPage {
  override frases: Frase[] = [
    { texto: 'Vamos brincar?', icon: 'assets/icon/brincar.png' },
    { texto: 'Meus brinquedos', icon: 'assets/icon/brinquedos.svg' },
    { texto: 'Quebra-cabeça', icon: 'assets/icon/quebra-cabeca.svg' },
    { texto: 'Assistir TV', icon: 'assets/icon/tv.svg' },
    { texto: 'Ouvir música', icon: 'assets/icon/musica.svg' },
    { texto: 'Ler uma história', icon: 'assets/icon/livro.svg' }
  ];
  constructor(favoritos: FavoritosService, config: ConfigService, voz: VozService) { super(favoritos, config, voz); }
}
