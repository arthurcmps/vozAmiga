import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterLink] 
})
export class CadastroPage {
  nomeCompleto: string = '';
  email: string = '';
  senha: string = '';
  telefone: string = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private alertController: AlertController,
    private router: Router
  ) {}

  async cadastrar() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.senha);
      const uid = userCredential.user.uid;

      const ref = doc(this.firestore, `usuarios/${uid}`);
      await setDoc(ref, {
        nomeCompleto: this.nomeCompleto,
        telefone: this.telefone,
        email: this.email,
      });

      const alert = await this.alertController.create({
        header: 'Cadastro realizado',
        message: 'Seu cadastro foi concluído com sucesso!',
        buttons: ['OK'],
        cssClass: 'alert-sucesso'
      });
      await alert.present();

      this.router.navigateByUrl('/inicial');
    } catch (erro: any) {
      const alert = await this.alertController.create({
        header: 'Erro no cadastro',
        message: erro.message,
        buttons: ['OK'],
        cssClass: 'alert-erro'
      });
      await alert.present();
    }
  }
}
