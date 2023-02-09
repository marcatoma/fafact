import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './almacen-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductoComponent } from './pages/producto/producto.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { UnidadMedidaComponent } from './pages/unidad-medida/unidad-medida.component';
import { UnidadMedidaFormComponent } from './pages/unidad-medida/unidad-medida-form/unidad-medida-form.component';

//primeng
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from "primeng/dialog";
import {InputTextModule} from 'primeng/inputtext';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';



@NgModule({
  declarations: [
    ProductoComponent,
    CategoriaComponent,
    UnidadMedidaComponent,
    UnidadMedidaFormComponent,
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //primeng
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToggleButtonModule,
    MessageModule,
    MessagesModule,
  ]
})
export class ProductosModule { }
