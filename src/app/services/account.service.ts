import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const urlAPI = "http://localhost:3000/registerForm"
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  totalCard = new Subject<number>();
  constructor(private http:HttpClient) { }
  getAll():Observable<any[]>{
    return this.http.get<any[]>(`${urlAPI}`)
  }
  getItem(id:number):Observable<any>{
    return this.http.get<any>(`${urlAPI}/${id}`)
  }
  editItem(data:any, id:number){
    return this.http.put(`${urlAPI}/${id}`,data);
  }
  delete( id:number):Observable<any[]>{
    return this.http.delete<any[]>(`${urlAPI}/${id}`)
  }
  
}
