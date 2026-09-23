import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  public traduzErro(codigo: string): string {
    switch (codigo) {
      case 'auth/invalid-email': return 'Informe um e-mail válido.';
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password': return 'Confira seu e-mail e sua senha.';
      case 'auth/email-already-in-use': return 'Este e-mail já possui uma conta. Entre ou recupere sua senha.';
      case 'auth/weak-password': return 'Use uma senha com pelo menos 6 caracteres.';
      case 'auth/too-many-requests': return 'Muitas tentativas. Aguarde um pouco e tente novamente.';
      case 'auth/network-request-failed':
      case 'unavailable': return 'Não foi possível conectar. Confira sua conexão e tente novamente.';
      case 'permission-denied': return 'Não foi possível acessar seus dados. Tente entrar novamente.';
      default: return 'Não foi possível concluir. Tente novamente.';
    }
  }
}
