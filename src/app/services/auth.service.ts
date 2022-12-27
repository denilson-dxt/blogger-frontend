import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http"
import { ILoginResponse } from '../interfaces/login-response';
import { ILoginData } from '../interfaces/login-data';
import { environment } from 'src/environments/environment';
import { IRegisterData } from '../interfaces/register-data';
import { IRegisterResponse } from '../interfaces/register-response';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(data:ILoginData):Observable<ILoginResponse>{
    return this.http.post<ILoginResponse>(`${environment.api}/auth/login`, data);
  }

  register(data:FormData):Observable<IUser>{
    console.log("Service", data);
    
    return this.http.post<IUser>(`${environment.api}/auth/register`, data);
  }

  getMe():Observable<IUser>{
    return this.http.get<IUser>(`${environment.api}/auth/me`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
  }
}
