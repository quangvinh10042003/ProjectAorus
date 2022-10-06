import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const urlAPI = "http://localhost:3000/category"
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll():Observable<any[]>{
    return this.http.get<any[]>(urlAPI);
  }
  getItem(id:number):Observable<any>{
    return this.http.get<any>(`${urlAPI}/${id}`);
  }
  editItem(id:number, data:any){
    return this.http.put(`${urlAPI}/${id}`,data);
  }
  deleteItem(id:number){
    return this.http.delete(`${urlAPI}/${id}`);
  }
  addItem(data:any){
    return this.http.post(`${urlAPI}`,data)
  }
}
