import { Component } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from '@angular/fire/auth';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterLink]
})
export class RecuperarSenhaPage {
  email: string = '';
  mensagem: string = '';
  sucesso: boolean = false;
  loading: boolean = false;

  constructor(private errorHandler: ErrorHandlerService) {}

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
        this.mensagem = 'Erro: ' + this.errorHandler.traduzErro(error.code);
        this.sucesso = false;
        this.loading = false;
      });
  }
}
