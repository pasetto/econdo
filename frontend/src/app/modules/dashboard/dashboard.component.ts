import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/auth/user';
import { UserService } from '../../core/user/user.service';
import { DashboardService } from './dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {
    
    public groups: any[] = [];

    constructor(
        private _dashboardService: DashboardService,
        private router: Router,
        ) {
            this._dashboardService.findAllGroups().subscribe(
                (response) => {
                    console.log(response);
                    this.groups = response;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        
        ngOnInit(): void {
            
        }
        
    }