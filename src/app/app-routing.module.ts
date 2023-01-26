import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'producto', loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule) },
  { path: '**', redirectTo: 'producto', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
