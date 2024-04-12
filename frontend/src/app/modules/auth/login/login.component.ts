import { NgModule } from '@angular/core';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth2Service } from './../auth.service';
import { UserService } from 'src/app/core/user/user.service';
@Component({
    selector     : 'auth-login',
    templateUrl  : './login.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls    : ['./login.component.scss']
})
export class AuthLoginComponent implements OnInit
{
    signInForm: FormGroup;
    loginError = {type: '', title: '', message: '', show: false};
    hidePassword: boolean = true;

    get f() { return this.signInForm.controls; }

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: Auth2Service,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _userService: UserService
        
    )
    {
        this.signInForm = this._formBuilder.group({
            email     : ['', [Validators.required, Validators.email]],
            password  : ['', Validators.required],
            rememberMe: ['']
          });
    }

    ngOnInit(): void
    {
        //remove the token from the local storage
        this._authService.logout();
    }

    login(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }
        // Disable the form
        this.signInForm.disable();

        this._authService.login(this.signInForm.value)
            .subscribe((response) => {
                
                // Re-enable the form
                this.signInForm.reset();
                this.loginError = {
                    type: 'success',
                    title: 'Sucesso!',
                    message: "Conta criada com sucesso!",
                    show: true
                }
                console.log(response);
                this._userService.user = response;

                this._router.navigate(['/dashboard']);

                },(error) => {
                    
                    this.signInForm.enable();

                    this.loginError = {
                        type: 'error',
                        title: 'Erro',
                        message: error.error.message,
                        show: true
                    }

                }
            );
    }
}
