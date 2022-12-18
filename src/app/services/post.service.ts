import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPost } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  private _posts_api_url = `${environment.api}/posts`;

  createPost(data: any): Observable<IPost> {
    console.log(data);

    return this.http.post<IPost>(this._posts_api_url, JSON.stringify(data), {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    })
  }
  updatePost(data: any): Observable<IPost> {
    console.log(data);

    return this.http.put<IPost>(this._posts_api_url, JSON.stringify(data), {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    })
  }



  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this._posts_api_url);
  }

  deletePost(postId: string): Observable<boolean> {
    return this.http.request<boolean>("DELETE", this._posts_api_url, {
      body: { id: postId },
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`

      }
    })
  }
}
