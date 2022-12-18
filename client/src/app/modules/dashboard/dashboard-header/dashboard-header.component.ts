import { Component, Injector, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
// import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(
    private _Router: Router,
    private _Injector: Injector,
    // private _DarkModeService: DarkModeService
  ) { }

  // User Object
  user: any = JSON.parse(localStorage.getItem('user') || '')

  // User Name
  userName = this.user.first_name + " " + this.user.last_name

  // Dark Mode Toggle
  // darkMode$: Observable<boolean> = this._DarkModeService.darkMode$

  ngOnInit() { }

  toggleDarkMode() {
    // this._DarkModeService.toggle()
  }

  logoutServiceFunction() {
    return new Promise((resolve, reject) => {
      let authService = this._Injector.get(AuthService)
      authService.signout()
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  async logout(){

    // Call logout Service Function
    await this.logoutServiceFunction()

    // Clear the storage
    localStorage.clear()
    sessionStorage.clear()

    // Redirect the user to home page
    this.redirectUser()
  }

  redirectUser() {
    this._Router.navigate(['/home/login'])
  }

}
