import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';

import { ProductoComponent } from './pages/producto/producto.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';



@NgModule({
  declarations: [
    ProductoComponent,
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
  ]
})
export class ProductosModule { }
