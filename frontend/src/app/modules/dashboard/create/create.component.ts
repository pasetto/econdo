import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './../dashboard.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    selector: 'app-dashboard-create',
    templateUrl: './create.component.html',
})

export class DashboardCreateComponent implements OnInit {
    
    
    createGroupForm: FormGroup;
    
    get f() { return this.createGroupForm.controls; }
    constructor(
        private _dashboardService: DashboardService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private _notificationService: NotificationService,
        ) {
            this.createGroupForm = this._formBuilder.group({
                name: ['', Validators.required],
                
                drawnDate : ['', [Validators.required]],
                deliveryDate : ['', [Validators.required]],
                deliveryPlace : ['', Validators.required],
            });
        }
        
        ngOnInit(): void {
        }
        
        createGroup(): void {
            // Return if the form is invalid
            if ( this.createGroupForm.invalid )
            {
                return;
            }
            // Disable the form
            this.createGroupForm.disable();
            
            this._dashboardService.createGroup(this.createGroupForm.value)
            .subscribe((response) => {
                this.router.navigate(['/dashboard/details/' + response['id'] ]);
                this._notificationService.openSuccessSnackBar('Grupo criado com sucesso!');
            }, (error) => {
                console.log(error);
                this._notificationService.openSuccessSnackBar('Houve um erro ao criar grupo!');
                
            }
            );
        }
        
        
        
    }