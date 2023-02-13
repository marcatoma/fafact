import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'almacen', loadChildren: () => import('./almacen/almacen.module').then(m => m.ProductosModule) },
  { path: '**', redirectTo: 'almacen', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
