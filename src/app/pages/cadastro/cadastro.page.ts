import { Component } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})
export class CadastroPage {
  nomeCompleto: string = '';
  telefone: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  async mostrarToast(mensagem: string, tipo: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2500,
      color: tipo,
      position: 'bottom',
    });
    await toast.present();
  }

  async cadastrar() {
    console.log('Iniciando cadastro...');

    if (this.senha !== this.confirmarSenha) {
      await this.mostrarToast('As senhas não coincidem!', 'danger');
      return;
    }

    environment.bloquearAutoLogin = true;

    const auth = getAuth();
    const firestore = getFirestore();

    try {
      console.log('Criando usuário...');
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.senha);
      const uid = userCredential.user.uid;
      console.log('Usuário criado com UID:', uid);

      console.log('Salvando dados no Firestore...');
      await setDoc(doc(firestore, 'usuarios', uid), {
        nomeCompleto: this.nomeCompleto,
        telefone: this.telefone,
        email: this.email,
      });

      console.log('Deslogando usuário...');
      await auth.signOut();

      console.log('Mostrando toast de sucesso...');
      await this.mostrarToast('Conta criada com sucesso! Faça login para continuar.', 'success');

      await new Promise(resolve => setTimeout(resolve, 300));
      environment.bloquearAutoLogin = false;
      console.log('Redirecionando para /home...');
      this.router.navigate(['/home']);

    } catch (error: any) {
      console.error('Erro ao cadastrar:', error.code, error.message);
      await this.mostrarToast(this.traduzErro(error.code), 'danger');
      environment.bloquearAutoLogin = false;
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
 