import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class PerfilPage implements OnInit {
  uid: string = '';
  nome: string = '';
  email: string = '';
  telefone: string = '';
  rate: number = 1.0;
  pitch: number = 1.0;
  pictogramSize: string = 'medio';
  carregando: boolean = true;

  constructor(
    private firestore: Firestore,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        this.email = user.email ?? '';

        const ref = doc(this.firestore, `usuarios/${this.uid}`);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const dados = snap.data();
          this.nome = dados['nomeCompleto'] ?? '';
          this.telefone = dados['telefone'] ?? '';
          this.rate = dados['rate'] ?? 1.0;
          this.pitch = dados['pitch'] ?? 1.0;
          this.pictogramSize = dados['pictogramSize'] ?? 'medio';
        } else {
          await setDoc(ref, {
            nomeCompleto: '',
            telefone: '',
            email: this.email,
            rate: 1.0,
            pitch: 1.0,
            pictogramSize: 'medio',
          });
        }

        this.carregando = false;
      } else {
        console.warn('Nenhum usuário logado');
        this.carregando = false;
      }
    });
  }

  async salvar() {
    if (!this.uid) return;

    const ref = doc(this.firestore, `usuarios/${this.uid}`);
    await updateDoc(ref, {
      nomeCompleto: this.nome,
      telefone: this.telefone,
      rate: this.rate,
      pitch: this.pitch,
      pictogramSize: this.pictogramSize,
    });

    const alerta = await this.alertController.create({
      header: 'Sucesso',
      message: 'Dados atualizados com sucesso!',
      buttons: ['OK'],
    });

    await alerta.present();
  }
}
