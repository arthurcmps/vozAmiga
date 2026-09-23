import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Router, RouterLink } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({ selector: 'app-home', templateUrl: 'home.page.html', styleUrls: ['home.page.scss'],
  standalone: true, imports: [IonicModule, FormsModule, CommonModule, RouterLink] })
export class HomePage {
  email = '';
  password = '';
  loading = false;
  mensagem = '';
  constructor(private auth: Auth, private router: Router, private errorHandler: ErrorHandlerService) {}
  async ionViewWillEnter(): Promise<void> {
    this.password = '';
    this.mensagem = '';
    await this.auth.authStateReady();
    if (this.auth.currentUser && !environment.bloquearAutoLogin) await this.router.navigateByUrl('/inicial', { replaceUrl: true });
  }
  async login(): Promise<void> {
    if (this.loading) return;
    if (!this.email.trim() || !this.password) { this.mensagem = 'Informe seu e-mail e sua senha.'; return; }
    this.loading = true;
    this.mensagem = '';
    try {
      await signInWithEmailAndPassword(this.auth, this.email.trim(), this.password);
      this.password = '';
      await this.router.navigateByUrl('/inicial', { replaceUrl: true });
    } catch (error: any) { this.mensagem = this.errorHandler.traduzErro(error.code); }
    finally { this.loading = false; }
  }
}
