import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private httpWithoutInterceptor: HttpClient

  constructor(private _HTTP: HttpClient, private _HTTP_BACKEND: HttpBackend) { 
    this.httpWithoutInterceptor = new HttpClient(this._HTTP_BACKEND)
  }

  BASE_API_URL = environment.BASE_API_URL + '/files'
}
