import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigService, PADRAO, Preferencias, normalizarPreferencias } from '../../services/config.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-perfil', templateUrl: './perfil.page.html', styleUrls: ['./perfil.page.scss'],
  standalone: true, imports: [IonicModule, FormsModule, CommonModule]
})
export class PerfilPage {
  uid = ''; nome = ''; email = ''; telefone = '';
  rate = 1; pitch = 1; pictogramSize: Preferencias['pictogramSize'] = 'medio';
  carregando = true; salvando = false; carregado = false; mensagem = ''; sucesso = false;
  private generation = 0;
  constructor(private auth: Auth, private firestore: Firestore, private config: ConfigService, private errors: ErrorHandlerService) { }

  async ionViewWillEnter(): Promise<void> {
    const generation = ++this.generation;
    this.carregando = true; this.carregado = false; this.mensagem = ''; this.sucesso = false;
    this.uid = ''; this.nome = ''; this.email = ''; this.telefone = ''; Object.assign(this, PADRAO);
    try {
      await this.auth.authStateReady();
      const user = this.auth.currentUser;
      if (!user) throw new Error('Sessão encerrada');
      const snap = await getDoc(doc(this.firestore, `usuarios/${user.uid}`));
      if (generation !== this.generation || this.auth.currentUser?.uid !== user.uid) return;
      const dados = snap.data() ?? {};
      this.uid = user.uid; this.email = user.email ?? '';
      this.nome = dados['nomeCompleto'] ?? ''; this.telefone = dados['telefone'] ?? '';
      Object.assign(this, normalizarPreferencias(dados));
      this.carregado = true;
    } catch (error: any) {
      console.error('[Perfil] Erro ao carregar perfil:', error);
      if (generation === this.generation) this.mensagem = this.errors.traduzErro(error.code);
    } finally { if (generation === this.generation) this.carregando = false; }
  }
  ionViewWillLeave(): void { ++this.generation; }

  async salvar(): Promise<void> {
    if (!this.carregado || this.salvando || !this.uid || this.auth.currentUser?.uid !== this.uid) return;
    const generation = this.generation;
    this.salvando = true; this.mensagem = ''; this.sucesso = false;
    const preferencias = normalizarPreferencias({ rate: this.rate, pitch: this.pitch, pictogramSize: this.pictogramSize });
    try {
      await setDoc(doc(this.firestore, `usuarios/${this.uid}`), {
        nomeCompleto: this.nome.trim(), telefone: this.telefone.trim(), email: this.email, ...preferencias,
      }, { merge: true });
      if (generation !== this.generation || this.auth.currentUser?.uid !== this.uid) return;
      this.config.aplicar(preferencias);
      this.sucesso = true; this.mensagem = 'Perfil e preferências atualizados.';
    } catch (error: any) {
      console.error('[Perfil] Erro ao salvar perfil:', error);
      if (generation === this.generation) this.mensagem = this.errors.traduzErro(error.code);
    } finally { this.salvando = false; }
  }
}
