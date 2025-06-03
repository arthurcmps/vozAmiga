import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { getAuth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
  standalone: false,
})
export class InicialPage implements OnInit {

  categorias = [
    {nome: 'Alimentos', icone: 'assets/icon/alimentos.png', rota: '/alimentos'},
    {nome: 'Sentimentos', icone: 'assets/icon/sentimentos.png', rota: '/sentimentos'},
    {nome: 'Brincar', icone: 'assets/icon/brincar.png', rota: '/brincar'},
    {nome: 'Pessoas', icone: 'assets/icon/pessoas.png', rota: '/pessoas'},
    {nome: 'Necessidades', icone: 'assets/icon/necessidades.png', rota: '/necessidades'},
    {nome: 'Locais', icone: 'assets/icon/locais.png', rota: '/locais'},
  ];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  abrirCategoria(categoria: any) {
    this.navCtrl.navigateForward(categoria.rota);
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.navCtrl.navigateRoot('/home');
    }).catch((error) => {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao sair. Tente novamente.');
    });
  }
}
