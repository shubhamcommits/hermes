import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HTTP: HttpClient) { }

  BASE_USER_API_URL = environment.BASE_API_URL + '/users'
  
  /**
   * This function is responsible for requesting the Create App API from the server
   * @param appData - needs to be passed as the functional parameter
   */
  getUser(userId: any) {
    return this._HTTP.get(this.BASE_USER_API_URL + `/get-users/${userId}`).toPromise()
  }
}


