import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate {

  constructor(private _Router: Router, private _AuthService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // If User is not loggedIn
    if (!this._AuthService.isLoggedIn()) {
      return true
    } else {
      this._Router.navigate(['/dashboard/home'])
      return false
    }
  }

}
