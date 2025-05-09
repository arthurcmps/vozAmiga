import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SentimentosPage } from './sentimentos.page';

const routes: Routes = [
  {
    path: '',
    component: SentimentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentimentosPageRoutingModule {}
