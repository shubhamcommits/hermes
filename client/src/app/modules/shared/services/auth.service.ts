import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HTTP: HttpClient) {}

  BASE_API_URL = environment.BASE_API_URL + '/auths'

  /**
   * This function is responsible for requesting the Login API from the server
   * @param userData - needs to be passed as the functional parameter
   */
  signIn(userData: Object) {
    return this._HTTP.post(this.BASE_API_URL + '/login', userData).toPromise()
  }

  /**
   * This function is responsible for requesting the Signup API from the server
   * @param userData - needs to be passed as the functional parameter
   */
  signUp(userData: Object) {
    return this._HTTP.post(this.BASE_API_URL + '/sign-up', userData).toPromise()
  }

  /**
   * This function is responsible for requesting the Signout API from the server
   * And clears the session and local storage from the client side
   */
  signout() {
    return this._HTTP.post(this.BASE_API_URL + '/logout', '').toPromise()
  }

  /**
   * This function is responsible for returnning the stored token
   * @returns 
   */
  getToken(){
    return localStorage.getItem('token')
  }

  /**
   * This function checks if a user is loggedIn or not
   * @returns 
   */
  isLoggedIn(){
    if(this.getToken())
      return true
    else 
      return false
  }
}
