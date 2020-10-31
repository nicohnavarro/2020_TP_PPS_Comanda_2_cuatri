import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaEmpleadosPageRoutingModule } from './alta-empleados-routing.module';

import { AltaEmpleadosPage } from './alta-empleados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaEmpleadosPageRoutingModule
  ],
  declarations: [AltaEmpleadosPage]
})
export class AltaEmpleadosPageModule {}
