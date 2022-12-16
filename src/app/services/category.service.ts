import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.api}/categories`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
  }
  createCategory(data: ICategory): Observable<ICategory> {
    console.log(data);
    
    return this.http.post<ICategory>(`${environment.api}/categories`, data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    })
  }
}
