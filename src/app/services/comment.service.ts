import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private _comments_api_url = `${environment.api}/comments`;

  constructor(private http: HttpClient) { }

  postComment(data: { postId: string, content: string }): Observable<IComment> {
    return this.http.post<IComment>(this._comments_api_url, data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
  }
}
