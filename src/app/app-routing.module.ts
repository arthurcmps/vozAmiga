import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicial',
    loadChildren: () => import('./pages/inicial/inicial.module').then(m => m.InicialPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alimentos',
    loadComponent: () => import('./pages/alimentos/alimentos.page').then(m => m.AlimentosPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'sentimentos',
    loadComponent: () => import('./pages/sentimentos/sentimentos.page').then(m => m.SentimentosPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'brincar',
    loadComponent: () => import('./pages/brincar/brincar.page').then(m => m.BrincarPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'pessoas',
    loadComponent: () => import('./pages/pessoas/pessoas.page').then(m => m.PessoasPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'necessidades',
    loadComponent: () => import('./pages/necessidades/necessidades.page').then(m => m.NecessidadesPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'locais',
    loadComponent: () => import('./pages/locais/locais.page').then(m => m.LocaisPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then(m => m.FavoritosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'recuperar-senha',
    loadComponent: () => import('./pages/recuperar-senha/recuperar-senha.page').then(m => m.RecuperarSenhaPage)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
