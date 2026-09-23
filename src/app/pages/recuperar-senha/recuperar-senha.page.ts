import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({ selector: 'app-recuperar-senha', templateUrl: './recuperar-senha.page.html', styleUrls: ['./recuperar-senha.page.scss'],
  standalone: true, imports: [IonicModule, FormsModule, CommonModule, RouterLink] })
export class RecuperarSenhaPage {
  email = ''; mensagem = ''; sucesso = false; loading = false;
  constructor(private auth: Auth, private errors: ErrorHandlerService) {}
  async enviarLink(): Promise<void> {
    if (this.loading) return;
    if (!this.email.trim()) { this.mensagem = 'Informe seu e-mail.'; this.sucesso = false; return; }
    this.loading = true; this.mensagem = ''; this.sucesso = false;
    try {
      await sendPasswordResetEmail(this.auth, this.email.trim());
      this.sucesso = true;
      this.mensagem = 'Se houver uma conta com este e-mail, você receberá as instruções para redefinir sua senha.';
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        this.sucesso = true;
        this.mensagem = 'Se houver uma conta com este e-mail, você receberá as instruções para redefinir sua senha.';
      } else { this.mensagem = this.errors.traduzErro(error.code); }
    } finally { this.loading = false; }
  }
}
