import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Model/product';
const urlAPI = 'https://json-aorus.onrender.com/product'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(`${urlAPI}`)
  }
  getItem(id:number):Observable<Product>{
    return this.http.get<Product>(`${urlAPI}/${id}`)
  }
}
