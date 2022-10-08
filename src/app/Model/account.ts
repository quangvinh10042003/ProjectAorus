import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Account {
    id?:number;
    email?:any;
    fullName?:string;
    password?:any;
    confirmPassword?:any;
    cart?:any;
    history?:any;
}
