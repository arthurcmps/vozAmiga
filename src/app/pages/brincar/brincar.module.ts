import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrincarPageRoutingModule } from './brincar-routing.module';

import { BrincarPage } from './brincar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrincarPageRoutingModule
  ],
  declarations: [BrincarPage]
})
export class BrincarPageModule {}
