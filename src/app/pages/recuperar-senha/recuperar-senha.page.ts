import { Component } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
  standalone: false,
})
export class RecuperarSenhaPage {
  email: string = '';

  constructor() {}

  enviarLink() {
    if (!this.email) {
      alert('Por favor, insira seu e-mail.');
      return;
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, this.email)
      .then(() => {
        alert('Link de redefinição enviado para seu e-mail.');
      })
      .catch((error) => {
        console.error('Erro ao enviar link:', error.code, error.message);
        alert('Erro: ' + this.traduzErro(error.code));
      });
  }

  traduzErro(codigo: string): string {
    switch (codigo) {
      case 'auth/invalid-email': return 'E-mail inválido.';
      case 'auth/user-not-found': return 'Usuário não encontrado.';
      default: return 'Erro desconhecido.';
    }
  }
}
