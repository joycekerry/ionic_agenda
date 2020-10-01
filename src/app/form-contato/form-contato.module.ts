import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule  } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { FormContatoPageRoutingModule } from './form-contato-routing.module';

import { FormContatoPage } from './form-contato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormContatoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormContatoPage]
})
export class FormContatoPageModule {}
