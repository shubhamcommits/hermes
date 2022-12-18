import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _Router: Router) { }

  // User Data Behaviour Subject
  public userDataSource = new BehaviorSubject<any>({})
  userData = this.userDataSource.asObservable()

  /**
   * Updates the User Data observable via feeding the data
   * @param user 
   */
  updateUser(user: any) {
    this.userDataSource.next(user)
  }

  @Output() mode = new EventEmitter<boolean>();
  toggleButton = false;
  // toggleDarkMode() {
  //   console.log("Working")
  //   this.mode.emit(this.toggleButton);
  //   this.toggleButton = !this.toggleButton ;
  //   // this._DarkModeService.toggle()
  // }

  /**
   * Gets the current user data
   * @returns 
   */
  getUser() {
    return new Promise((resolve) => {
      this.userData
        .subscribe((res: any) => {
          if (JSON.stringify(res) != JSON.stringify({}) && JSON.stringify(res) != JSON.stringify(null)) {

            // Fetch the status
            let status = res['active']

            // Redirect accordingly
            if (status === false) {

              // Clear the storage
              localStorage.clear()
              sessionStorage.clear()

              // Redirect the user to home page
              this._Router.navigate(['/home/login'])
            }

            // Resolve the user
            resolve(res)
          }
        })
    })
  }

  /**
   * This functions checks, if the current user is active or not
   * @returns 
   */
  checkUserIsActive() {
    return new Promise<boolean>((resolve, reject) => {
      this.getUser()
        .then((res: any) => {
          resolve(res['active'])
        })
        .catch(() => {
          reject(false)
        })
    })
  }

  /**
   * Check the empty object status
   * @param object 
   * @returns 
   */
  checkEmptyObject(object: any) {
    return JSON.stringify("{}") == JSON.stringify(object)
  }

  /**
   * This function is responsible for copying to clipboard
   * @param val 
   */
  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
