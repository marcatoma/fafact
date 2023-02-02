import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
//components
import { HomeComponent } from './pages/home/home.component';



const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' },
        ]

    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }