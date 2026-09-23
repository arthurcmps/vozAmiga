import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
  standalone: false,
})
export class InicialPage {

  categorias = [
    { nome: 'Alimentos', icone: 'assets/icon/alimentos.png', rota: '/alimentos' },
    { nome: 'Sentimentos', icone: 'assets/icon/sentimentos.png', rota: '/sentimentos' },
    { nome: 'Brincar', icone: 'assets/icon/brincar.png', rota: '/brincar' },
    { nome: 'Pessoas', icone: 'assets/icon/pessoas.png', rota: '/pessoas' },
    { nome: 'Necessidades', icone: 'assets/icon/necessidades.png', rota: '/necessidades' },
    { nome: 'Locais', icone: 'assets/icon/locais.png', rota: '/locais' },
  ];

  constructor(private navCtrl: NavController, private auth: Auth) { }

  abrirCategoria(categoria: any) {
    this.navCtrl.navigateForward(categoria.rota);
  }

  abrirPerfil() {
    const activeElement = document.activeElement as HTMLElement | null;

    if (activeElement) {
      activeElement.blur();

      const shadowActive =
        activeElement.shadowRoot?.activeElement as HTMLElement | null;

      shadowActive?.blur();
    }

    this.navCtrl.navigateForward('/perfil');
  }

  logout() {
    signOut(this.auth).then(() => {
      this.navCtrl.navigateRoot('/home');
    }).catch((error) => {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao sair. Tente novamente.');
    });
  }
}
