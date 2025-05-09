import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
  standalone: false,
})
export class InicialPage implements OnInit {

  categorias = [
    {nome: 'Alimentos', icone: 'assets/icon/alimentos.png', rota: '/alimentos'},
    {nome: 'Sentimentos', icone: 'assets/icon/sentimentos.png', rota: '/categoria/sentimentos'},
    {nome: 'Brincar', icone: 'assets/icon/brincar.png', rota: '/categoria/brincar'},
    {nome: 'Pessoas', icone: 'assets/icon/pessoas.png', rota: '/categoria/pessoas'},
    {nome: 'Necessidades', icone: 'assets/icon/necessidades.png', rota: 'categoria/necessidades'},
    {nome: 'Locais', icone: 'assets/icon/locais.png', rota: 'categoria/locais'},
  ];

  constructor(private navCtrl: NavController) { }

  abrirCategoria(categoria: any){
    this.navCtrl.navigateForward(categoria.rota);
  }

  ngOnInit() {
  }

}
