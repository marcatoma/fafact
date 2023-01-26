import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductoComponent } from './pages/producto/producto.component';

const routes: Routes = [
    {
        path: '',
        component: ProductoComponent,
        children: [
            { path: 'producto', component: ProductoComponent },
            { path: '**', redirectTo: 'producto' },
        ]

    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductosRoutingModule { }