import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false, 
})
export class CadastroPage {
  nomeCompleto: string = '';
  email: string = '';
  senha: string = '';
  telefone: string = '';

  constructor(
    private firestore: Firestore,
    private alertController: AlertController,
    private router: Router
  ) {}

  async cadastrar() {
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.senha);
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
