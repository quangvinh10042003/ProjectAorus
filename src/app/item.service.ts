import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const Api = 'http://localhost:3000/news'
const blog = 'http://localhost:3000/blogs'
const home = 'http://localhost:3000/product'
const user = 'http://localhost:3000/registerForm'
const banner = 'http://localhost:3000/banner'
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
