import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentaComponent } from './venta/venta.component';
import { ClienteComponent } from './cliente/cliente.component';


@NgModule({
  declarations: [VentaComponent, ClienteComponent],
  imports: [
    CommonModule,
    VentasRoutingModule
  ]
})
export class VentasModule { }
