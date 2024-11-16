import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailListPageRoutingModule } from './detail-list-routing.module';

import { DetailListPage } from './detail-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailListPageRoutingModule,
    SharedModule
  ],
  declarations: [DetailListPage],
  exports:[DetailListPage]
})
export class DetailListPageModule {}
