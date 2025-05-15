import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false,
})
export class FavoritosPage {
  frasesFavoritas: string[] = [];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    this.carregarFavoritos();
  }

  async carregarFavoritos() {
    const dados = await this.storage.get('favoritos');
    this.frasesFavoritas = dados || [];
  }

  async removerFavorito(index: number) {
    this.frasesFavoritas.splice(index, 1);
    await this.storage.set('favoritos', this.frasesFavoritas);
  }

    falar(texto: string) {
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    window.speechSynthesis.speak(fala);
  }

}
