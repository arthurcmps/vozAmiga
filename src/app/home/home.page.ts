import { Component } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Login bem-sucedido:', user);
        this.router.navigate(['/inicial']); // Redireciona para a tela inicial
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro no login:', errorCode, errorMessage);
        alert('Erro ao entrar: ' + this.traduzErro(errorCode));
      });
  }

  traduzErro(codigo: string): string {
    switch (codigo) {
      case 'auth/invalid-email': return 'Email inválido.';
      case 'auth/user-not-found': return 'Usuário não encontrado.';
      case 'auth/wrong-password': return 'Senha incorreta.';
      default: return 'Usuario ou senha inválidos.';
    }
  }
}
