import { Component } from '@angular/core';

@Component({
  selector: 'app-necessidades',
  templateUrl: './necessidades.page.html',
  styleUrls: ['./necessidades.page.scss'],
  standalone: false,
})
export class NecessidadesPage {
  necessidades = [
    { texto: 'Quero ir ao banheiro', icon: 'assets/icon/banheiro.png' },
    { texto: 'Estou com sede', icon: 'assets/icon/sede.png' },
    { texto: 'Estou com fome', icon: 'assets/icon/fome.png' },
    { texto: 'Quero descansar', icon: 'assets/icon/descansar.png' },
    { texto: 'Estou com dor', icon: 'assets/icon/dor.png' },
    { texto: 'Estou com frio', icon: 'assets/icon/frio.png' }
  ];

  falar(texto: string) {
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    window.speechSynthesis.speak(fala);
  }
}
