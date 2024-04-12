import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
  Route,
  UrlSegment,
  CanActivateChild,
  CanLoad,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    public _userService: UserService,
    public router: Router
    ) {}

  /**
     * Can activate
     *
     * @param route
     * @param state
     */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
      const redirectUrl = state.url === '/auth/login' ? '/' : state.url;
      return this._check(redirectUrl);
  }

  /**
   * Can activate child
   *
   * @param childRoute
   * @param state
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
      const redirectUrl = state.url === '/auth/login' ? '/' : state.url;
      return this._check(redirectUrl);
  }

  /**
   * Can load
   *
   * @param route
   * @param segments
   */
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
  {
      console.log(segments);
      return this._check('/');
  }

  private _check(redirectURL: string): Observable<boolean>
    {
        if(this._userService.isLoggedIn) {
            return of(true);
        } else {
            this.router.navigate(['/auth/login']);
            return of(false);
        }
    }
}