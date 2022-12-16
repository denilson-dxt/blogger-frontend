import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categories_api_url = `${environment.api}/categories`;
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this._categories_api_url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
  }
  createCategory(data: ICategory): Observable<ICategory> {
    console.log(data);

    return this.http.post<ICategory>(this._categories_api_url, data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    })
  }

  updateCategory(data: ICategory): Observable<ICategory> {
    console.log(data);

    return this.http.put<ICategory>(this._categories_api_url, data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
  }

  deleteCategory(id: string): Observable<boolean> {
    return this.http.request<boolean>("DELETE", this._categories_api_url, {
      body: { id: id },
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`

      }
    })
  }
}
