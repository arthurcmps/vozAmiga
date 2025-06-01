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
  mensagem: string = '';
  sucesso: boolean = false;
  loading: boolean = false;

  constructor() {}

  enviarLink() {
    if (!this.email) {
      this.mensagem = 'Por favor, insira seu e-mail.';
      this.sucesso = false;
      return;
    }

    this.loading = true;
    this.mensagem = '';

    const auth = getAuth();
    sendPasswordResetEmail(auth, this.email)
      .then(() => {
        this.mensagem = 'Link de redefinição enviado para seu e-mail.';
        this.sucesso = true;
        this.loading = false;
      })
      .catch((error) => {
        this.mensagem = 'Erro: ' + this.traduzErro(error.code);
        this.sucesso = false;
        this.loading = false;
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
