import { NgModule } from '@angular/core';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth2Service } from './../auth.service';

@Component({
    selector     : 'auth-register',
    templateUrl  : './register.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AuthRegisterComponent implements OnInit
{
    registerForm: FormGroup;
    registerError = {type: '', title: '', message: '', show: false};
    hidePassword: boolean = true;

    get f() { return this.registerForm.controls; }

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: Auth2Service,
        private _formBuilder: FormBuilder,
        private _router: Router,
        
    )
    {
        this.registerForm = this._formBuilder.group({
            name:       ['', Validators.required],
            email:      ['', [Validators.required, Validators.email]],
            password:   ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
            phone:      ['', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
          });
    }

    ngOnInit(): void
    {
    }

    register(): void
    {
        // Return if the form is invalid
        if ( this.registerForm.invalid )
        {
            return;
        }
        // Disable the form
        this.registerForm.disable();

        this._authService.register(this.registerForm.value)
            .subscribe((response) => {
                
                // Re-enable the form
                this.registerForm.reset();
                this.registerError = {
                    type: 'success',
                    title: 'Sucesso!',
                    message: "Conta criada com sucesso!",
                    show: true
                }

                // Navigate to the home page
                //wait 3 seconds before redirecting
                setTimeout(() => {
                    this._router.navigate(['/auth/login']);
                }, 3000);

                },(error) => {
                    
                    this.registerForm.enable();

                    this.registerError = {
                        type: 'error',
                        title: 'Erro',
                        message: error.error.message,
                        show: true
                    }

                }
            );
    }
}
