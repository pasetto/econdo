import { Route } from '@angular/router';
// import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { AuthLoginComponent } from './login/login.component';
import { AuthRegisterComponent } from './register/register.component';
import { AuthForgotMyPasswordComponent } from './forgot-my-password/forgot-my-password.component';

export const authRoutes: Route[] = [
    {
        path     : 'login',
        component: AuthLoginComponent
    },
    {
        path     : 'register',
        component: AuthRegisterComponent
    },
    {
        path     : 'forgot-my-password',
        component: AuthForgotMyPasswordComponent
    },
    {
        path      : '**',
        redirectTo: 'login'
    }
];
