import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';
    private durationInSeconds = 5;

    private optionsSnack = {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
    };

    constructor(
        private _httpClient: HttpClient,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

    private openSnackBar(message: string, action: string = '', panelClass: string[] = []): void {
        console.log('openSnackBar');
        const options = {
        ...this.optionsSnack,
        panelClass,
        };
        this._snackBar.open(message, action, options);
        this.scrollToTop();
    }

    openDefaultSnackBar(message: string, action: string = '', durationInSeconds: number = this.durationInSeconds): void {
        this.openSnackBar(message, action);
    }

    openSuccessSnackBar(message: string, action: string = '', durationInSeconds: number = this.durationInSeconds): void {
        this.openSnackBar(message, action, ['mat-toolbar', 'mat-primary']);
    }

    openErrorSnackBar(message: string, action: string = '', durationInSeconds: number = this.durationInSeconds): void {
        this.openSnackBar(message, action, ['mat-toolbar', 'mat-warn']);
    }

    openWarningSnackBar(message: string, action: string = '', durationInSeconds: number = this.durationInSeconds): void {
        this.openSnackBar(message, action, ['mat-toolbar', 'mat-accent']);
    }

    scrollToTop(): void {
        window.scrollTo(0, 0);
    }

}
