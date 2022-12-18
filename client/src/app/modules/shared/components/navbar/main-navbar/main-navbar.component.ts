import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
// import { DarkModeService } from 'angular-dark-mode';
// import  { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  constructor(
    private _Router: Router,
    private _Injector: Injector,
    // private _DarkModeService: DarkModeService
  ) { }

  // User Object
  user: any = JSON.parse(localStorage.getItem('user') || '')

  // Dark Mode Toggle
  // darkMode$: Observable<boolean> = this._DarkModeService.darkMode$
  @Output() mode = new EventEmitter<boolean>();
  ngOnInit() {
    // console.log(this.user)
  }
 
  // toggleButton = UtilityService.toggleButton;
  toggleButton = false;
  toggleDarkMode() {
    // console.log("Working")
    // this.mode.emit(this.toggleButton);
    // this.toggleButton = !this.toggleButton ;
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
