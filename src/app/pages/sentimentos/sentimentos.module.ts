import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SentimentosPageRoutingModule } from './sentimentos-routing.module';

import { SentimentosPage } from './sentimentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SentimentosPageRoutingModule
  ],
  declarations: [SentimentosPage]
})
export class SentimentosPageModule {}
