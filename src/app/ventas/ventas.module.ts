import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentaComponent } from './pages/venta/venta.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { CapturarProductosComponent } from './pages/venta/capturar-productos/capturar-productos.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [VentaComponent, ClienteComponent, ClienteFormComponent, CapturarProductosComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    // prime ng modules
    ButtonModule,
    TableModule,
    InputTextModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    AutoCompleteModule,
    InputNumberModule
  ]
})
export class VentasModule { }
