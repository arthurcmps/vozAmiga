import { Component } from '@angular/core';

@Component({
  selector: 'app-sentimentos',
  templateUrl: './sentimentos.page.html',
  styleUrls: ['./sentimentos.page.scss'],
  standalone: false,
})
export class SentimentosPage {
  sentimentos = [
    { texto: 'Estou feliz', icon: 'assets/icon/feliz.png' },
    { texto: 'Estou triste', icon: 'assets/icon/triste.png' },
    { texto: 'Estou com raiva', icon: 'assets/icon/raiva.png' },
    { texto: 'Estou com medo', icon: 'assets/icon/medo.png' },
    { texto: 'Estou cansado', icon: 'assets/icon/cansado.png' },
    { texto: 'Estou animado', icon: 'assets/icon/animado.png' }
  ];

  falar(texto: string) {
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    window.speechSynthesis.speak(fala);
  }
}
