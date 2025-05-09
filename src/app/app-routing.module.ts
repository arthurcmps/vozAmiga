import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicial',
    loadChildren: () => import('./pages/inicial/inicial.module').then( m => m.InicialPageModule)
  },
    {
    path: 'alimentos',
    loadChildren: () => import('./pages/alimentos/alimentos.module').then( m => m.AlimentosPageModule)
  },  {
    path: 'sentimentos',
    loadChildren: () => import('./pages/sentimentos/sentimentos.module').then( m => m.SentimentosPageModule)
  },
  {
    path: 'brincar',
    loadChildren: () => import('./pages/brincar/brincar.module').then( m => m.BrincarPageModule)
  },
  {
    path: 'pessoas',
    loadChildren: () => import('./pages/pessoas/pessoas.module').then( m => m.PessoasPageModule)
  },
  {
    path: 'necessidades',
    loadChildren: () => import('./pages/necessidades/necessidades.module').then( m => m.NecessidadesPageModule)
  },
  {
    path: 'locais',
    loadChildren: () => import('./pages/locais/locais.module').then( m => m.LocaisPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
