import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth2Service } from '../auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
// import { AuthService } from './../auth.service';

@Component({
    selector     : 'auth-forgot-my-password',
    templateUrl  : './forgot-my-password.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AuthForgotMyPasswordComponent implements OnInit
{
    // recoverForm!: FormGroup;
    // @ViewChild('signInNgForm') signInNgForm: NgForm;

    recoverForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: Auth2Service,
        private _formBuilder: UntypedFormBuilder,
        private _notificationService: NotificationService,
        private _router: Router
    )
    {
        this.recoverForm = this._formBuilder.group({
            email:       ['', [Validators.required, Validators.email]],            
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.recoverForm = this._formBuilder.group({
            email     : ['', [Validators.required, Validators.email]],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    recover(): void{
        this._authService.recover(this.recoverForm.value).subscribe(
            (response) => {
                console.log(response);
                this._notificationService.openSuccessSnackBar('Recuperação de senha enviada com sucesso!');
                this._router.navigateByUrl('/auth/login');
            },
            (error) => {
                console.log(error);
                this._notificationService.openSuccessSnackBar('Houve algum problema! Tente mais tarde.');
            }
        );
    }
}
