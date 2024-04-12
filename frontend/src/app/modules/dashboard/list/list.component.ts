import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './../dashboard.service';

@Component({
    selector: 'app-dashboard-list',
    templateUrl: './list.component.html',
})

export class DashboardListComponent implements OnInit {
    
    public groups: any[] = [];
    public members: any[] = [];

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

            this._dashboardService.findAllMemberGroups().subscribe(
                (response) => {
                    console.log(response);
                    this.members = response;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        
        ngOnInit(): void {
            
        }
        
    }