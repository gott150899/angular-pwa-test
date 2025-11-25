import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import("./home/home.component").then(c => c.HomeComponent)
    },
    {
        path: 'detail',
        loadComponent: () => import("./detail/detail.component").then(c => c.DetailComponent)
    }
];
