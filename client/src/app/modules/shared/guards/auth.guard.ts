import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _Router: Router, private _AuthService: AuthService){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // If User is loggedIn
    if (this._AuthService.isLoggedIn()) {
      return true
    } else {
      this._Router.navigate(['/home/login'], { queryParams: { 'redirectURL': state.url } })
      return false
    }
  }

}
