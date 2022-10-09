import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class Product {
    id?:number;
    category_id?:number;
    gen?:string;
    name?:string;
    imgProduct?:any;
    price?:number;
    slide?:any;
    bestFeatures?:string
    features?:any;
    specifying?:any;
    category_name?:string
}
