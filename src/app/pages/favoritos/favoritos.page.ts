import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false,
})
export class FavoritosPage {
  frasesFavoritas: { texto: string, icon: string }[] = [];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    this.carregarFavoritos();
  }

  async carregarFavoritos() {
    const dados = await this.storage.get('favoritos');
    this.frasesFavoritas = (dados || []).filter((f: any) => f?.texto && f?.icon);
  }

  async removerFavorito(index: number) {
    this.frasesFavoritas.splice(index, 1);
    await this.storage.set('favoritos', this.frasesFavoritas);
  }

  async falar(texto: string) {
    if (texto) {
      await TextToSpeech.speak({
        text: texto,
        lang: 'pt-BR',
        rate: 0.95,
        pitch: 1.05,
        volume: 1.0,
      });
    }
  }
}
