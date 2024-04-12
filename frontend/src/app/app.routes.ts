import { Route } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
// import { NoAuthGuard } from './core/auth/noAuth.guard';
// import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from './app.resolvers';
import { AppComponent } from './app.component';
import { LayoutComponent } from './core/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch : 'full', redirectTo: 'dashboard'},

    {
        path: '',
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        children: [
            {path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
        ]
    },
    {
        path: '**',
        redirectTo: '/auth/login'
    }
];
