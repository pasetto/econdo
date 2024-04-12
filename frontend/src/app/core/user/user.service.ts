import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from './user.types';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);
    router: any;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _router: Router
        )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        if (!value) {
            this._router.navigate(['/logout']);
            return;
        }
        if (value.accessToken) {
            localStorage.setItem('accessToken', value.accessToken);
        }
        sessionStorage.setItem('gcu', JSON.stringify(value));
        this._user.next(value);
    }

    get user$(): Observable<User | null>
    {
        return this._user.asObservable();
    }

    get isLoggedIn(): boolean
    {
        let authToken = setTimeout(() => { localStorage.getItem('accessToken'); });
        return authToken !== null ? true : false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User>
    {
        return this._httpClient.get<any>(`/auth/me`).pipe(
            tap((response) => {
                localStorage.setItem('accessToken', response.accessToken || '');
                sessionStorage.setItem('gcu', JSON.stringify(response));
                this._user.next(response);
            })
        );
    }

    getToken(): string
    {
        return localStorage.getItem('accessToken') || '';
    }
}