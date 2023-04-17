import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const urlAPI = "https://json-aorus.onrender.com/product"
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  getAll():Observable<any[]>{
    return this.http.get<any[]>(urlAPI);
  }
  getItem(id:number):Observable<any>{
    return this.http.get<any>(`${urlAPI}/${id}`);
  }
  editItem(id:number, data:any):Observable<any>{
    return this.http.put(`${urlAPI}/${id}`,data);
  }
  deleteItem(id:number):Observable<any>{
    return this.http.delete(`${urlAPI}/${id}`);
  }
  addItem(data:any):Observable<any>{
    return this.http.post(`${urlAPI}`,data)
  }
}
