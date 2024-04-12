import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
// import { AuthUtils } from 'app/core/auth/auth.utils';
// import { UserService } from 'app/core/user/user.service';
//imoprt env


@Injectable()
export class Auth2Service
{
    private _authenticated: boolean = false;
    
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        )
        {
    }

    logout(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('gcu');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    register(user: { name: string; email: string; password: string, phone: string}): Observable<any>
    {
        return this._httpClient.post(`/auth/register`, user);
    }

    login(user: { email: string; password: string}): Observable<any>
    {
        return this._httpClient.post(`/auth/login`, user);
    }

    recover(email: string ): Observable<any>
    {
        return this._httpClient.post(`/auth/recover`, email);
    }
    
}
