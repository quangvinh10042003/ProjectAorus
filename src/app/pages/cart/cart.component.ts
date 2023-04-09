import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  dateBuy: any;
  getCart: number = 0;
  cart: any=[];
  acc: any;
  billingCheckbox: boolean = false;
  subtotal: number = 0;
  category: any = [];
  listPrice: any = [];
  history: any = [];
  checkData:any;
  account:any;
  user:any;
  fullData:any;
  dataProduct:any;
  quantity:any;
  formCart = new FormGroup({
    history:new FormControl([]),
    fullName: new FormControl('', [
      Validators.required,
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z_.][a-zA-Z0-9]{0,10}@[a-z0-9]{4,10}\.[a-z]{2,5}$')
    ]),
    password: new FormControl('', [
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
    ]),
  })
  constructor(private accountService:AccountService,private categorySer:CategoryService,private actRouter:ActivatedRoute,private productService:ProductService,private router:Router) { }
  
  ngOnInit(): void {
    document.documentElement.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; 
    let year = date.getFullYear();
    this.dateBuy = `${day}/${month}/${year}`;
    this.checkData = localStorage.getItem('accountSignin')
    this.checkData = JSON.parse(this.checkData);
    this.accountService.getItem(this.checkData).subscribe();
    this.accountService.getItem(this.checkData).subscribe((data:any)=>{
      this.account = data;
      this.cart = data.cart
      console.log(this.cart);
      
      for(let i=0;i<this.cart.length;i++){
        this.categorySer.getItem(this.cart[i].category_id).subscribe((item:any)=>{
          this.category.push(item.name);
        })  
      }
    })
    this.accountService.totalCard.subscribe((data: any) => {
      this.getCart = data;
    })
    this.getAllData();
  }
  get form(){
    return this.formCart.controls;
  }
  getAllData() {
    this.subtotal = 0;
    this.listPrice = [];
    this.accountService.getItem(this.checkData).subscribe((data: any) => {
      this.formCart.patchValue(data);
      this.account = data;
      this.cart = data.cart;
      this.history = data.history;
      this.getCart = data.cart.length;
      for (let i = 0; i < this.cart.length; i++) {
        this.categorySer.getItem(this.cart[i].category_id).subscribe((item: any) => {
          this.category.push(item.name);
        })
        if (this.cart[i].quantity == null) {
          this.subtotal += parseInt(this.cart[i].price);
          this.listPrice.push(parseInt(this.cart[i].price));
        } else {
          this.subtotal += parseInt(this.cart[i].price) * this.cart[i].quantity;
          this.listPrice.push(parseInt(this.cart[i].price) * this.cart[i].quantity);
        }
      }
    })
  }
  deleteItem(i:number):void{    
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete the product?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.subtotal = 0;
        this.cart.splice(i, 1);
        this.listPrice.splice(i, 1);
        this.getCart -= 1;
        this.accountService.totalCard.next(this.getCart);
        this.accountService.getItem(this.checkData).subscribe((data: any) => {
          data.cart = this.cart;
          this.accountService.editItem(data,this.checkData).subscribe();  
          for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].quantity == null) {
              this.subtotal += this.cart[i].price;
            } else {
              this.subtotal += this.cart[i].price * this.cart[i].quantity;
            }
          }
        })
      }
    })
  

  }
  reduceQuantity(i:number){
    this.accountService.getItem(this.checkData).subscribe((data: any) => {
      data.cart[i].quantity = data.cart[i].quantity - 1;
      if (data.cart[i].quantity == 0) {
        this.deleteItem(i);
      } else {
        this.accountService.editItem(data,this.checkData).subscribe(() => {
          this.getAllData();
        });
      }
    })
  }
  increaseQuantity(i:number){
    this.accountService.getItem(this.checkData).subscribe((data: any) => {
      data.cart[i].quantity = data.cart[i].quantity + 1;
      this.accountService.editItem(data,this.checkData).subscribe(() => {
        this.getAllData();
      });
    })
  }
  checkout(){
    this.history.push({
      consignee: this.form.fullName.value,
      subtotal: this.subtotal,
      email: this.form.email.value,
      address: this.form.address.value,
      phone: this.form.phone.value,
      date: this.dateBuy,
      cart: this.cart
    })
    this.account.cart = [];
    this.account.history = this.history;
    this.accountService.editItem(this.account,this.checkData).subscribe((data:any) => {
      // this.account.history.push({ id: data.id, name: data.name, img: data.imgProduct, category_id: data.category_id, quantity: 1, price: data.price,category_name: data.category_name });
      this.accountService.totalCard.next(0);
      this.getAllData();
    });
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Thank you for purchasing from us!',
      showConfirmButton: false,
      timer: 1500
    })
  }
 

}
 