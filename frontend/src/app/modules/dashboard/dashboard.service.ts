import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DashboardService
{
    private _groups: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for Groups
     */
    get groups$(): Observable<any>
    {
        return this._groups.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    findAllGroups(): Observable<any>
    {
        return this._httpClient.get<any>(`/groups`)
            .pipe(
                tap((response: any) => {
                    return response;
                    // this._groups.next(response);
                })
            );
    }

    findAllMemberGroups(): Observable<any>
    {
        return this._httpClient.get<any>(`/groups/member`)
    }

    findGroupById(groupId: string): Observable<any>
    {
        return this._httpClient.get<any>(`/groups/${groupId}`);
    }

    createGroup(group: any): Observable<any>
    {
        return this._httpClient.post<any>(`/groups`, group);
    }

    updateGroup(groupId: string, group: any): Observable<any>
    {
        return this._httpClient.put<any>(`/groups/${groupId}`, group);
    }

    getParticipants(groupId: string): Observable<any>
    {
        return this._httpClient.get<any>(`/group-members/${groupId}`);
    }

    createParticipant(participant: any): Observable<any>
    {
        return this._httpClient.post<any>(`/group-members`, participant);
    }

    removeParticipant(participantId: string): Observable<any>
    {
        return this._httpClient.delete<any>(`/group-members/${participantId}`);
    }

    drawGroup(groupId: string): Observable<any>
    {
        return this._httpClient.get<any>(`/groups/${groupId}/draw`);
    }

}
