import { Component } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})
export class CadastroPage {

  nomeCompleto: string = '';
  dataNascimento: string = '';
  telefone: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  constructor(private router: Router) {}

  async cadastrar() {
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const auth = getAuth();
    const firestore = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.senha);
      const uid = userCredential.user.uid;

      // Salva dados adicionais no Firestore
      await setDoc(doc(firestore, 'usuarios', uid), {
        nomeCompleto: this.nomeCompleto,
        dataNascimento: this.dataNascimento,
        telefone: this.telefone,
        email: this.email,
      });

      alert('Conta criada com sucesso!');
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error.code, error.message);
      alert(this.traduzErro(error.code));
    }
  }

  traduzErro(codigo: string): string {
    switch (codigo) {
      case 'auth/email-already-in-use': return 'Este e-mail já está em uso.';
      case 'auth/invalid-email': return 'E-mail inválido.';
      case 'auth/weak-password': return 'Senha fraca (mínimo 6 caracteres).';
      default: return 'Erro desconhecido.';
    }
  }
}
