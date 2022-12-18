import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _HTTP: HttpClient) { }

  BASE_APP_API_URL = environment.BASE_API_URL + '/apps'
  BASE_SERVICE_API_URL = environment.BASE_API_URL + '/services'
  BASE_API_URL = environment.BASE_API_URL + '/custom-apis'

  /**
   * This function is responsible for requesting the Create App API from the server
   * @param appData - needs to be passed as the functional parameter
   */
  createApp(appData: Object) {
    return this._HTTP.post(this.BASE_APP_API_URL + '/', appData).toPromise()
  }

  /**
   * This function is responsible for requesting the apps of currently logged user API from the server
   */
  fetchUserApps() {
    return this._HTTP.get(this.BASE_APP_API_URL + '/').toPromise()
  }

  /**
   * This function is responsible for removing App from the server
   * @param appId - needs to be passed as the functional parameter
   */
  removeApp(appId: any) {
    return this._HTTP.delete(this.BASE_APP_API_URL + `/${appId}`).toPromise()
  }

  /**
   * This function is responsible for requesting the Create Service API from the server
   * @param appData - needs to be passed as the functional parameter
   */
  createService(appData: Object) {
    return this._HTTP.post(this.BASE_SERVICE_API_URL + '/', appData).toPromise()
  }

  /**
   * This function is responsible for removing Service from the server
   * @param serviceId - needs to be passed as the functional parameter
   */
  removeService(serviceId: any) {
    return this._HTTP.delete(this.BASE_SERVICE_API_URL + `/${serviceId}`).toPromise()
  }

  /**
   * This function is responsible for requesting the service details from the server
   */
  getService(serviceId: any) {
    return this._HTTP.get(this.BASE_SERVICE_API_URL + `/${serviceId}`).toPromise()
  }

  /**
   * This function is responsible for requesting the services falling under one application from the server
   */
  fetchUserServices(appId: any) {
    return this._HTTP.get(this.BASE_SERVICE_API_URL + `?appId=${appId}`).toPromise()
  }

  /**
   * This function is responsible for requesting the Create API from the server
   * @param apiData - needs to be passed as the functional parameter
   */
  createApi(apiData: Object) {
    return this._HTTP.post(this.BASE_API_URL + '/', apiData).toPromise()
  }

  /**
   * This function is responsible for requesting the api details from the server
   */
  getApi(apiId: any) {
    return this._HTTP.get(this.BASE_API_URL + `/${apiId}`).toPromise()
  }
  removeApi(apiId :any){
    return this._HTTP.delete(this.BASE_API_URL + `/${apiId}`).toPromise()
  }


  /**
   * This function is responsible for requesting the apis falling under one application and service from the server
   */
  fetchServiceApis(appId: any, serviceId: any) {
    return this._HTTP.get(this.BASE_API_URL + `?appId=${appId}&serviceId=${serviceId}`).toPromise()
  }

  /**
   * This function is responsible for requesting the Change API Status from the server
   * @param apiId - needs to be passed as the functional parameter
   * @param apiData - needs to be passed as the functional parameter
   */
  changeApiStatus(apiId: any, apiData: { active: boolean, interval: string }) {
    return this._HTTP.put(this.BASE_API_URL + `/status/${apiId}`, apiData).toPromise()
  }
}
