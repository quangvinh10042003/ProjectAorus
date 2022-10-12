import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from 'src/app/service/category.service';
import { AccountService } from 'src/app/service/account.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  sliderImg:any = [];
  dataProduct:any;
  listFeatures:any;
  listSpecifying:any = [];
  account:any;
  cart = [];
  fullData:any;
  checkData:any;
  user:any;
  quantity = 1;
  category_name:any;
  getCart:any;
  history = [];
  constructor(private productService:ProductService,private http:HttpClient,private router:Router,private actRouter:ActivatedRoute,private categorySer:CategoryService,private accountService:AccountService) { }

  ngOnInit(): void {
    document.documentElement.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    let id = this.actRouter.snapshot.params['id']
  
    this.productService.getAll().subscribe((data:any)=>{
      this.dataProduct = data.find((item:any)=>{
          return item.id == id
        })
        this.listSpecifying = this.dataProduct.specifying
        this.listFeatures = this.dataProduct.features
        this.sliderImg = this.dataProduct.slide;
        this.categorySer.getAll().subscribe((item:any)=>{
            item.find((category:any)=>{
            return category.id == this.dataProduct.category_id
          })
        })
    })
    this.checkData = localStorage.getItem('accountSignin');
    this.checkData = JSON.parse(this.checkData)
    console.log(this.checkData)
    this.accountService.getItem(this.checkData).subscribe((data:any)=>{
      this.user = data
      
      // console.log(this.user);
    })
  }
  customOptions: OwlOptions = {
    items:1,
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 200,
    navText: ['', ''],
    responsive: {
        0:{
          items:1,
      },
      600:{
          items:1,
      },
      1000:{
          items:1,
      }
    },
    nav: false
  }
  scroll():void{
    document.documentElement.scrollTop = 800;
  }
  addToCart():void{
    let id = this.actRouter.snapshot.params['id']
    this.productService.getItem(id).subscribe((data)=>{
      let _id:any = localStorage.getItem('accountSignin');
      _id = JSON.parse(_id);
      let account:any;
      let checkData:any;
      this.accountService.getItem(_id).subscribe((acc)=>{
        account = acc;
        checkData = acc.cart.find((item:any)=>{
          return item.id == id
        })
        // console.log(acc);
        
        if(checkData){
          checkData.quantity += 1;    
          this.accountService.editItem(acc,_id).subscribe();
        }else{    
          acc.cart.push({ id: data.id, name: data.name, img: data.imgProduct, category_id: data.category_id, quantity: 1, price: data.price,category_name: data.category_name });
          console.log(acc);
          this.accountService.editItem(acc,_id).subscribe(()=>{
            this.accountService.getItem(_id).subscribe((ItemtotalCard:any)=>{
              this.accountService.totalCard.next(ItemtotalCard.cart.length);
            })
          });
        }
        this.router.navigate(['/cart'])
      })
    })
   
  
  }

}
