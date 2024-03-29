import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { VentaComponent } from './pages/venta/venta.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'cliente', component: ClienteComponent },
      { path: 'factura', component: VentaComponent },
      // { path: '**', redirectTo: '' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { } 
