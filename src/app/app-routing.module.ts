import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './views/dashboard.component';
import { HeroesComponent } from './views/heroes.component';
import { HeroDetailComponent } from './views/hero-detail.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'heroes',
        component: HeroesComponent
    },
    {
        path: 'detail/:heroId',
        component: HeroDetailComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}