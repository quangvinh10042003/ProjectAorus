import { Router } from '@angular/router';
import  Swal  from 'sweetalert2';
import { AccountService } from './../../services/account.service';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  list: any = [
  ]
  new: any = []
  banner: any = []
  constructor(private app: ItemService, private productSer: ProductsService, private accountSer: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.app.getHome().subscribe((data: any) => {
      this.list = data.filter((e: any) => {
        return e.status === "home"
      })
    })
    this.app.getNew().subscribe((data: any) => {
      this.new = data.filter((e: any) => {
        return e.status === "home"
      })
    })
    this.app.getBanner().subscribe((data: any) => {
      this.banner = data

    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  addToCart(idProduct:number){
    let id:any = localStorage.getItem('accountSignin');
    id = JSON.parse(id);
    let account:any;
    let checkData:any;
    if(id){
      this.productSer.getItem(idProduct).subscribe((data:any)=>{
        this.accountSer.getItem(id).subscribe((acc)=>{
          account = acc;
          checkData = acc.cart.find((item:any)=>{
            return item.id == idProduct
          })
          if(checkData){
            checkData.quantity += 1;
            this.accountSer.editItem(acc,id).subscribe();
          }else{
            acc.cart.push({ id: data.id, name: data.name, img: data.imgProduct, category_id: data.category_id, quantity: 1, price: data.price });
            this.accountSer.editItem(acc,id).subscribe();
          }
        })
      })
    }else{
      Swal.fire({
        title: 'You are not logged in',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login']);
        }
      })
    }
    
  }
}
