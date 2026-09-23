import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({ selector: 'app-cadastro', templateUrl: './cadastro.page.html', styleUrls: ['./cadastro.page.scss'],
  standalone: true, imports: [IonicModule, FormsModule, CommonModule, RouterLink] })
export class CadastroPage {
  nomeCompleto = ''; email = ''; senha = ''; telefone = '';
  loading = false; mensagem = ''; contaCriada = false;
  private pendingUid = '';
  constructor(private auth: Auth, private firestore: Firestore, private router: Router, private errors: ErrorHandlerService) {}
  async cadastrar(): Promise<void> {
    if (this.loading) return;
    if (!this.nomeCompleto.trim() || !this.email.trim() || !this.telefone.trim() || (!this.contaCriada && this.senha.length < 6)) {
      this.mensagem = 'Preencha os dados e use uma senha com pelo menos 6 caracteres.'; return;
    }
    this.loading = true; this.mensagem = '';
    try {
      if (!this.contaCriada) {
        const credential = await createUserWithEmailAndPassword(this.auth, this.email.trim(), this.senha);
        this.pendingUid = credential.user.uid; this.contaCriada = true; this.senha = '';
      }
      if (this.auth.currentUser?.uid !== this.pendingUid) throw new Error('Sessão alterada');
      await setDoc(doc(this.firestore, `usuarios/${this.pendingUid}`), {
        nomeCompleto: this.nomeCompleto.trim(), telefone: this.telefone.trim(), email: this.auth.currentUser.email,
      }, { merge: true });
      this.contaCriada = false; this.pendingUid = '';
      await this.router.navigateByUrl('/inicial', { replaceUrl: true });
    } catch (error: any) {
      this.mensagem = this.contaCriada
        ? 'Sua conta foi criada, mas o perfil não foi salvo. Tente salvar novamente ou entre depois para completar o perfil.'
        : this.errors.traduzErro(error.code);
    } finally { this.loading = false; }
  }
}
