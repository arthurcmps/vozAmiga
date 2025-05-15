import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private favoritos: string[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const dados = await this.storage.get('favoritos');
    this.favoritos = dados || [];
  }

  getFavoritos() {
    return this.favoritos;
  }

  async adicionar(frase: string) {
    if (!this.favoritos.includes(frase)) {
      this.favoritos.push(frase);
      await this.storage.set('favoritos', this.favoritos);
    }
  }

  async remover(frase: string) {
    this.favoritos = this.favoritos.filter(f => f !== frase);
    await this.storage.set('favoritos', this.favoritos);
  }
}
