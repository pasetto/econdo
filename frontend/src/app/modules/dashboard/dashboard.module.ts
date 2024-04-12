import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { NgForm } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { AlertModule } from 'src/app/core/components/alert/alert.module';
import { UserService } from 'src/app/core/user/user.service';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { DashboardListComponent } from './list/list.component';
import { DashboardCreateComponent } from './create/create.component';
import { DashboardDetailsComponent } from './details/details.component';
import { DashboardService } from './dashboard.service';

@NgModule({
    declarations: [
        DashboardComponent,
        DashboardListComponent,
        DashboardCreateComponent,
        DashboardDetailsComponent
    ],
    // ...

        imports     : [
            RouterModule.forChild(dashboardRoutes),
            AlertModule,
            MatButtonModule,
            MatCheckboxModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatProgressSpinnerModule,
            MatTabsModule,   
            FormsModule,
            ReactiveFormsModule,
            NgxMaskDirective,
            CommonModule
        ],
    providers   : [
        UserService,
        DashboardService,
        provideNgxMask()
    ]
})
export class DashboardModule
{
}
