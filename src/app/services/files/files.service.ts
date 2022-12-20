import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFile } from 'src/app/interfaces/file';
import { IFolder } from 'src/app/interfaces/folder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private _files_api_url = `${environment.api}/files`;
  private _folders_api_url = `${environment.api}/folders`;

  constructor(private http:HttpClient) { }

  getFoldersByParent(parentId:string="root"):Observable<IFolder[]>{
    return this.http.get<IFolder[]>(`${this._folders_api_url}/parent/${parentId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
  }
  getFilesByParent(parentId:string="root"):Observable<IFile[]>{
    return this.http.get<IFile[]>(`${this._files_api_url}/parent/${parentId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
  }
}

