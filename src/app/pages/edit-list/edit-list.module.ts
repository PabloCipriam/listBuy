import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditListPageRoutingModule } from './edit-list-routing.module';

import { EditListPage } from './edit-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditListPageRoutingModule,
    SharedModule
  ],
  declarations: [EditListPage]
})
export class EditListPageModule {}
