import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http"
import { ILoginResponse } from '../interfaces/login-response';
import { ILoginData } from '../interfaces/login-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(data:ILoginData):Observable<ILoginResponse>{
    return this.http.post<ILoginResponse>(`${environment.api}/auth/login`, data);
  }
}
