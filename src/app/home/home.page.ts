import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterLink } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterLink]
})
export class HomePage {

  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router, private errorHandler: ErrorHandlerService) {}

  async login() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      const user = userCredential.user;
      console.log('Login bem-sucedido:', user);
      this.router.navigate(['/inicial']);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Erro no login:', errorMessage);
      alert('Erro ao entrar: ' + this.errorHandler.traduzErro(errorCode));
    }
  }
}
