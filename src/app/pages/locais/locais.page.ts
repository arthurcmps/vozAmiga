import { Component } from '@angular/core';

@Component({
  selector: 'app-locais',
  templateUrl: './locais.page.html',
  styleUrls: ['./locais.page.scss'],
  standalone: false,
})
export class LocaisPage {
  locais = [
    { texto: 'Quero ir para casa', icon: 'assets/icon/casa.png' },
    { texto: 'Quero ir para escola', icon: 'assets/icon/escola.png' },
    { texto: 'Quero ir ao parquinho', icon: 'assets/icon/parquinho.png' },
    { texto: 'Quero ir à sala', icon: 'assets/icon/sala.png' },
    { texto: 'Quero ir ao quarto', icon: 'assets/icon/quarto.png' },
    { texto: 'Quero sair', icon: 'assets/icon/sair.png' }
  ];

  falar(texto: string) {
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    window.speechSynthesis.speak(fala);
  }
}
