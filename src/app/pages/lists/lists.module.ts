import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListsPageRoutingModule } from './lists-routing.module';

import { ListsPage } from './lists.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditListPageModule } from '../edit-list/edit-list.module';
import { DetailListPageModule } from '../detail-list/detail-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsPageRoutingModule,
    SharedModule,
    EditListPageModule,
    DetailListPageModule
  ],
  declarations: [ListsPage]
})
export class ListsPageModule {}
