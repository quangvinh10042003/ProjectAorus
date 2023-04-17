import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Account } from '../Model/account';

const urlAPI = "http://localhost:3000/registerForm"
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  totalCard = new Subject<number>();
  constructor(private http:HttpClient) { }
  getAll():Observable<Account[]>{
    return this.http.get<Account[]>(`${urlAPI}`)
  }
  getItem(id:number):Observable<Account>{
    return this.http.get<Account>(`${urlAPI}/${id}`)
  }
  editItem(data:Account, id:number):Observable<any>{
    return this.http.put(`${urlAPI}/${id}`,data);
  }
  delete( id:number):Observable<Account[]>{
    return this.http.delete<Account[]>(`${urlAPI}/${id}`)
  }
  
}
