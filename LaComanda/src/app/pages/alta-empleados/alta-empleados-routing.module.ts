import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaEmpleadosPage } from './alta-empleados.page';

const routes: Routes = [
  {
    path: '',
    component: AltaEmpleadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaEmpleadosPageRoutingModule {}
