import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const urlAPICategory = "https://json-aorus.onrender.com/category"
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  getAll():Observable<any[]>{
    return this.http.get<any[]>(`${urlAPICategory}`)
  }
  getItem(id:number):Observable<any>{
    return this.http.get<any>(`${urlAPICategory}/${id}`)
  }
}
