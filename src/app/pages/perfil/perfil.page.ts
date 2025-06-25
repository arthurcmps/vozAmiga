import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
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
          console.log('🔥 Dados do Firestore:', dados);

          // Pega o nome salvo como nomeCompleto
          this.nome = dados['nomeCompleto'] ?? '';
          this.telefone = dados['telefone'] ?? '';
        } else {
          // Se não existir o documento, cria com os dados mínimos
          await setDoc(ref, {
            nomeCompleto: '',
            telefone: '',
            email: this.email,
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
    });

    const alerta = await this.alertController.create({
      header: 'Sucesso',
      message: 'Dados atualizados com sucesso!',
      buttons: ['OK'],
    });

    await alerta.present();
  }
}
