import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPost } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  createPost(data:any):Observable<IPost>{
    console.log(data);
    
      return this.http.post<IPost>(`${environment.api}/posts`, JSON.stringify(data), {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      })
  } 
}
