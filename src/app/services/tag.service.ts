import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITag } from '../interfaces/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private _tags_api_url = `${environment.api}/tags`;

  constructor(private http: HttpClient) { }
  getAllTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(`${environment.api}/tags`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
  }

  createTag(data: ITag): Observable<ITag> {
    return this.http.post<ITag>(this._tags_api_url, data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    })
  }

  updateTag(data:ITag):Observable<ITag>{
    console.log(data);
    
    return this.http.put<ITag>(this._tags_api_url, data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    })
  }

  deleteTag(tagId:string):Observable<boolean>{
    return this.http.request<boolean>("DELETE", this._tags_api_url, {
      body: {id: tagId},
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    })
  }
}
