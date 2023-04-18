import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'cliente', component: ClienteComponent },
      { path: 'venta', component: VentaComponent },
      // { path: '**', redirectTo: '' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { } 
