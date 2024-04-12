import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from './../dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/user/user.service';
import { NotificationService } from './../../../core/services/notification.service';
@Component({
    selector: 'app-dashboard-details',
    templateUrl: './details.component.html',
})

export class DashboardDetailsComponent implements OnInit {
    
    
    detailsGroupForm: FormGroup;
    participantsGroupForm: FormGroup;
    currentId: string;
    authorId: string = '';
    participants: any[] = [];
    readOnly = true

    constructor(
        private _dashboardService: DashboardService,
        private _userService: UserService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _notificationService: NotificationService,
        private _changeDetectorRef: ChangeDetectorRef
        ) {
            this.detailsGroupForm = this._formBuilder.group({
                name: ['', Validators.required],
                drawnDate : ['', [Validators.required]],
                deliveryDate : ['', [Validators.required]],
                deliveryPlace : ['', Validators.required],
            });

            this.participantsGroupForm = this._formBuilder.group({
                name: ['', Validators.required],
                email : ['', Validators.required],
                phone : ['', Validators.required],
            });

            this.currentId = this.route.snapshot.params['id'];

            this._dashboardService.findGroupById(this.currentId).subscribe(
                (response) => {
                    response.drawnDate = response.drawnDate.replace('T', ' ').substring(0, 16);
                    response.deliveryDate = response.deliveryDate.replace('T', ' ').substring(0, 16);
                    this.detailsGroupForm = this._formBuilder.group({
                        id: [response.id],
                        name: [response.name, Validators.required],
                        drawnDate : [response.drawnDate, [Validators.required]],
                        deliveryDate : [response.deliveryDate, [Validators.required]],
                        deliveryPlace : [response.deliveryPlace, Validators.required],
                    });

                    this.authorId = response.authorId;
                    this.verifyReadOnly();
                },
                (error) => {
                    
                }
            );

            
            this._getParticipants();

        }
        
        ngOnInit(): void {
            
        }

        detailsGroup(): void {
            // Return if the form is invalid
            if ( this.detailsGroupForm.invalid )
            {
                return;
            }
            // Disable the form
            this.detailsGroupForm.disable();
    
            this._dashboardService.updateGroup(this.detailsGroupForm.value.id, this.detailsGroupForm.value)
                .subscribe((response) => {
                    this._notificationService.openSuccessSnackBar('Grupo atualizado com sucesso!');
                }, (error) => {
                    this._notificationService.openErrorSnackBar('Houve um erro, tente novamente.');
                }
                );
        }

        participantsGroup(): void {
            if ( this.participantsGroupForm.invalid )
            {
                return;
            }
            this._getParticipants();
            
        }

        createParticipant(): void {
            if ( this.participantsGroupForm.invalid )
            {
                return;
            }

            this.participantsGroupForm.disable();
            this._createParticipant(this.participantsGroupForm.value, this.currentId);
        }

        addMeInList(): void {
            this._userService.get().subscribe((response) => {
                let data = {
                    name: response.name,
                    email: response.email,
                    phone: response.phone,
                };
                this._createParticipant({data}, this.currentId);
            });
        }

        verifyReadOnly(): void {
            this._userService.get().subscribe((response) => {
                this.readOnly = (response.id === this.authorId)? false : true;
            });
        }

        drawGroup(): void {
            this._dashboardService.drawGroup(this.currentId)
                .subscribe((response) => {
                    
                    this._notificationService.openSuccessSnackBar('Sorteio realizado!');
                    this.router.navigate(['/dashboard/list']);
                }, (error) => {
                    
                    this._notificationService.openErrorSnackBar('Houve um erro, o número de participantes pode ser menor que 2. Tente novamente.');
                }
                );
        }

        /**
         * 
         * REQUESTS
         * 
         */
        _createParticipant(data: any, groupId: string): void {
            this._dashboardService.createParticipant({ ...data, groupId})
                .subscribe((response) => {
                    this.participantsGroupForm.reset();
                    this._notificationService.openSuccessSnackBar('Participante adicionado com sucesso!');
                }, (error) => {
                    
                    
                    this._notificationService.openSuccessSnackBar('Participante já existente!');
                }, () => {
                    this._getParticipants();
                    this.participantsGroupForm.enable();
                }
            );
        }

        removeParticipant(id: string): void {
            this._removeParticipant(id);
        }

        _removeParticipant(id: string): void {
            this._dashboardService.removeParticipant(id)
                .subscribe((response) => {
                    this._getParticipants();
                    
                    this._notificationService.openSuccessSnackBar('Participante removido com sucesso!');
                }, (error) => {
                    
                    
                    this._notificationService.openErrorSnackBar('Erro eo remover participante!');
                }
                );
            return;
        }

        _getParticipants() {
            return this._dashboardService.getParticipants(this.currentId)
                .subscribe((response) => {
                    return this.participants = response;
                }, (error) => {
                    
                    // Re-enable the form
                    // this.participantsGroupForm.reset();
                },() => {
                });
        }
        
    }