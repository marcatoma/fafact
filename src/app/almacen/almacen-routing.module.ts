import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductoComponent } from './pages/producto/producto.component';
import { UnidadMedidaComponent } from './pages/unidad-medida/unidad-medida.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { UnidadMedidaFormComponent } from './pages/unidad-medida/unidad-medida-form/unidad-medida-form.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'producto', component: ProductoComponent },
            { path: 'categoria', component: CategoriaComponent },
            { path: 'unidad-medida', component: UnidadMedidaComponent },
            { path: 'unidad-medida-form', component: UnidadMedidaFormComponent },
            // { path: '**', redirectTo: '' },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductosRoutingModule { }