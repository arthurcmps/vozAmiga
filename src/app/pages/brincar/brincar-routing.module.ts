import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrincarPage } from './brincar.page';

const routes: Routes = [
  {
    path: '',
    component: BrincarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrincarPageRoutingModule {}
