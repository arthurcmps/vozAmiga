import { Component } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  async mostrarMensagem(mensagem: string, tipo: 'success' | 'danger' = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom',
      color: tipo,
    });

    await toast.present();
    await toast.onDidDismiss(); // Espera o toast desaparecer
  }

  async cadastrar() {
    if (this.senha !== this.confirmarSenha) {
      await this.mostrarMensagem('As senhas não coincidem!', 'danger');
      return;
    }

    const auth = getAuth();
    const firestore = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.senha);
      const uid = userCredential.user.uid;

      await setDoc(doc(firestore, 'usuarios', uid), {
        nomeCompleto: this.nomeCompleto,
        dataNascimento: this.dataNascimento,
        telefone: this.telefone,
        email: this.email,
      });

      // Mostra o toast de sucesso e espera ele sumir
      await this.mostrarMensagem('Conta criada com sucesso! Faça login para continuar.', 'success');

      // Desloga o usuário
      await auth.signOut();

      // Redireciona para a tela de login (home)
      this.router.navigate(['/home']);

    } catch (error: any) {
      console.error('Erro ao cadastrar:', error.code, error.message);
      await this.mostrarMensagem(this.traduzErro(error.code), 'danger');
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
