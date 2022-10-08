import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  checkData:any;
  cart:any;
  account:any;
  category:any = [];
  listHistory:any =[];
  dateBuy: any;
  getCart: number = 0;
  acc: any;
  billingCheckbox: boolean = false;
  subtotal: number = 0;
  listPrice: any = [];
  history: any = [];
  user:any;
  fullData:any;
  dataProduct:any;
  quantity:any;
  constructor(private accService:AccountService,private categorySer:CategoryService,private actRouter:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    // let id = this.actRouter.snapshot.params['id']

    this.checkData = localStorage.getItem('accountSignin');
    this.checkData = JSON.parse(this.checkData);
    console.log(this.checkData);
    if (this.checkData) {
      this.accService.getItem(this.checkData).subscribe((data:any)=>{
        this.listHistory = data.history
        
      })
    }
    
  }
  getAllData() {
    this.subtotal = 0;
    this.listPrice = [];
    this.accService.getItem(this.checkData).subscribe((data: any) => {
      // this.formCart.patchValue(data);
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
  removeAllItem() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete the all product?!",
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
        this.accService.getItem(this.checkData).subscribe((data:any)=>{
          data.history = []
          this.accService.editItem(data,this.checkData).subscribe(()=>{
            this.accService.getAll().subscribe((data:any)=>{
                this.listHistory = [];
            })  
          });
        })
      }
    })
  }
 
  removeItem(i:number){
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
        this.listHistory.splice(i,1)
        this.accService.getItem(this.checkData).subscribe((data:any)=>{
          data.history = this.listHistory
          this.accService.editItem(data,this.checkData).subscribe();
        })
      }
    })
  }
  signOut(){
    localStorage.removeItem(this.checkData);
    this.router.navigate(['/login'])

  }

}
