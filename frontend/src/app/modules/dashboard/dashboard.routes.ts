import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardListComponent } from './list/list.component';
import { DashboardCreateComponent } from './create/create.component';
import { DashboardDetailsComponent } from './details/details.component';

export const dashboardRoutes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {

        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'list',
                component: DashboardListComponent,
            },
            {
                path: 'create',
                component: DashboardCreateComponent,
            },
            {
                path: 'details/:id',
                component: DashboardDetailsComponent,
            },
        ],
    },
];