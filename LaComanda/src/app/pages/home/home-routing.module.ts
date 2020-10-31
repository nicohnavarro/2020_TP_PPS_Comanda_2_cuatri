import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'duenio',
        loadChildren: () => import('../duenio/duenio.module').then( m => m.DuenioPageModule)
      },
      {
        path: 'supervisor',
        loadChildren: () => import('../supervisor/supervisor.module').then( m => m.SupervisorPageModule)
      },
      {
        path: 'empleado',
        loadChildren: () => import('../empleado/empleado.module').then( m => m.EmpleadoPageModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('../cliente/cliente.module').then( m => m.ClientePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
