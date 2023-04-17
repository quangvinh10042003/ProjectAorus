import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const Api = 'https://json-aorus.onrender.com/news'
const blog = 'https://json-aorus.onrender.com/blogs'
const home = 'https://json-aorus.onrender.com/product'
const user = 'https://json-aorus.onrender.com/registerForm'
const banner = 'https://json-aorus.onrender.com/banner'
@Injectable({
  providedIn: 'root'
})

export class ItemService {

  constructor(private http: HttpClient) { }
  getNew() {
    return this.http.get<any>(`${Api}`)
  }
  getBlog() {
    return this.http.get<any>(`${blog}`)
  }
  getDetailBlog(id: Number) {
    return this.http.get<any>(`${blog}/${id}`)
  }
  getDetailNew(id: Number) {
    return this.http.get<any>(`${Api}/${id}`)

  }
  getHome() {
    return this.http.get<any>(`${home}`)
  }
  getUser(id: Number) {
    return this.http.get<any>(`${user}/${id}`)
  }
  getBanner() {
    return this.http.get<any>(`${banner}`)
  }
  deleteItem(id:number):Observable<any[]>{
    return this.http.delete<any[]>(`${user}/${id}`)
  }
  editData(data: any, id:number){
     return this.http.put(`${user}/${id}`,data)
  }
}
