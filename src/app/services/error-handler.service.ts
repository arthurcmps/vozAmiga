import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public traduzErro(codigo: string): string {
    switch (codigo) {
      case 'auth/invalid-email': return 'Email inválido.';
      case 'auth/user-not-found': return 'Usuário não encontrado.';
      case 'auth/wrong-password': return 'Senha incorreta.';
      default: return 'Ocorreu um erro inesperado. Tente novamente.';
    }
  }
}
