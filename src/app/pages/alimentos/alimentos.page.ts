import { Component } from '@angular/core';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.page.html',
  styleUrls: ['./alimentos.page.scss'],
  standalone: false,
})
export class AlimentosPage {

  frases = [
    { texto: 'Quero comer.' },
    { texto: 'Estou com fome.' },
    { texto: 'Quero arroz.' },
    { texto: 'Quero feijão.' },
    { texto: 'Quero pão.' },
    { texto: 'Quero fruta.' },
    { texto: 'Não gosto disso.' },
    { texto: 'Está gostoso.' },
    { texto: 'Quero beber.' },
    { texto: 'Estou com sede.' },
    { texto: 'Quero suco.' },
    { texto: 'Não quero mais.' },
  ];

  falar(texto: string) {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(texto);
    synth.speak(utterThis);
  }

}
