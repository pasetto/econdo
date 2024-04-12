import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

// import { FuseCardModule } from '@fuse/components/card';
// import { FuseAlertModule } from '@fuse/components/alert';
// import { SharedModule } from 'app/shared/shared.module';
// import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';

import { authRoutes } from './auth.routes';
import { AuthLoginComponent } from './login/login.component';
import { AuthRegisterComponent } from './register/register.component';
import { AuthForgotMyPasswordComponent } from './forgot-my-password/forgot-my-password.component';
import { NgForm } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth2Service } from './auth.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { AlertModule } from 'src/app/core/components/alert/alert.module';
import { UserService } from 'src/app/core/user/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        AuthLoginComponent,
        AuthRegisterComponent,
        AuthForgotMyPasswordComponent
    ],
    // ...

        imports     : [
            RouterModule.forChild(authRoutes),
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
            MatSnackBarModule,
            CommonModule
        ],
    providers   : [
        Auth2Service,
        UserService,
        NotificationService,
        provideNgxMask()
    ]
})
export class AuthModule
{
}
