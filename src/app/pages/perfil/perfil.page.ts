import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { doc, getDoc, updateDoc, Firestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  uid: string = '';
  nome: string = '';
  email: string = '';
  telefone: string = '';

  constructor(
    private firestore: Firestore,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        const docRef = doc(this.firestore, `usuarios/${this.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          this.nome = data['nome'] ?? '';
          this.email = data['email'] ?? user.email ?? '';
          this.telefone = data['telefone'] ?? '';
        }
      }
    });
  }

  async salvar() {
    const docRef = doc(this.firestore, `usuarios/${this.uid}`);
    await updateDoc(docRef, {
      nome: this.nome,
      telefone: this.telefone,
    });

    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Dados atualizados com sucesso!',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
