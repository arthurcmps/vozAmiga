import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
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
    loadChildren: () => import('./pages/alimentos/alimentos.module').then(m => m.AlimentosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sentimentos',
    loadChildren: () => import('./pages/sentimentos/sentimentos.module').then(m => m.SentimentosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'brincar',
    loadChildren: () => import('./pages/brincar/brincar.module').then(m => m.BrincarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pessoas',
    loadChildren: () => import('./pages/pessoas/pessoas.module').then(m => m.PessoasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'necessidades',
    loadChildren: () => import('./pages/necessidades/necessidades.module').then(m => m.NecessidadesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'locais',
    loadChildren: () => import('./pages/locais/locais.module').then(m => m.LocaisPageModule),
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
    loadChildren: () => import('./pages/recuperar-senha/recuperar-senha.module').then(m => m.RecuperarSenhaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
