import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NecessidadesPageRoutingModule } from './necessidades-routing.module';

import { NecessidadesPage } from './necessidades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NecessidadesPageRoutingModule
  ],
  declarations: [NecessidadesPage]
})
export class NecessidadesPageModule {}
