import { Component } from '@angular/core';

@Component({
  selector: 'app-brincar',
  templateUrl: './brincar.page.html',
  styleUrls: ['./brincar.page.scss'],
  standalone: false,
})
export class BrincarPage {
  brincadeiras = [
    { texto: 'Quero brincar de bola', icon: 'assets/icon/bola.png' },
    { texto: 'Vamos desenhar', icon: 'assets/icon/desenhar.png' },
    { texto: 'Quero brincar de massinha', icon: 'assets/icon/massinha.png' },
    { texto: 'Vamos jogar juntos', icon: 'assets/icon/jogar.png' },
    { texto: 'Quero assistir desenho', icon: 'assets/icon/desenho.png' },
    { texto: 'Quero brincar de esconde-esconde', icon: 'assets/icon/esconde.png' }
  ];

  falar(texto: string) {
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    window.speechSynthesis.speak(fala);
  }
}
