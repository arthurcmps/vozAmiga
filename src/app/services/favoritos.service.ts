import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Frase {
  texto: string;
  icon: string;
  selecionado?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private favoritos: Frase[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const dados = await this.storage.get('favoritos');
    this.favoritos = dados || [];
  }

  getFavoritos(): Frase[] {
    return this.favoritos;
  }

  async adicionar(frase: Frase) {
    if (!this.favoritos.some(f => f.texto === frase.texto)) {
      this.favoritos.push(frase);
      await this.storage.set('favoritos', this.favoritos);
    }
  }

  async remover(frase: Frase) {
    this.favoritos = this.favoritos.filter(f => f.texto !== frase.texto);
    await this.storage.set('favoritos', this.favoritos);
  }

  estaNosFavoritos(frase: Frase): boolean {
    return this.favoritos.some(f => f.texto === frase.texto);
  }
}
