import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
import { AccountService } from './../../services/account.service';
import { ProductsService } from './../../services/products.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pc-building',
  templateUrl: './pc-building.component.html',
  styleUrls: ['./pc-building.component.css']
})
export class PcBuildingComponent implements OnInit {
  EstimatedCosts: number = 0;
  listCategory: any;
  listItemChosen: any = [
    { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
    { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
    { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
    { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
    { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
    { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
    { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
    { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
    { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
    { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
  ];
  listProduct: any;
  listAllItem: any;
  listProductInModal: any = [];
  acc: any;
  constructor(private router: Router, private categorySer: CategoryService, private productSer: ProductsService, private accountSer: AccountService) { }

  ngOnInit(): void {
    this.categorySer.getAll().subscribe((data: any) => {
      this.listCategory = data;
    })
    this.productSer.getAll().subscribe((data: any) => {
      this.listProduct = data;
      this.listAllItem = data;
    })
    let id: any = localStorage.getItem('accountSignin');
    console.log(id);
    id = JSON.parse(id);
    this.accountSer.getItem(id).subscribe((data: any) => {
      this.acc = data;
    })
  }
  choseTypeProduct(category_id: number) {
    this.listProduct = this.listAllItem.filter((data: any) => {
      return data.category_id == category_id
    })
    this.listProductInModal = this.listProduct;
  }
  choseItem(id: number, category_id: number) {
    this.productSer.getItem(id).subscribe((data: any) => {
      this.listItemChosen[category_id - 1].name = data.name;
      this.listItemChosen[category_id - 1].imgProduct = data.imgProduct;
      this.listItemChosen[category_id - 1].bestFeatures = data.bestFeatures;
      this.listItemChosen[category_id - 1].price = data.price;
      this.listItemChosen[category_id - 1].id = data.id;
      this.getEstimate();
    })
  }
  deleteItem(category_id: number) {
    this.listItemChosen[category_id - 1].name = '';
    this.listItemChosen[category_id - 1].imgProduct = '';
    this.listItemChosen[category_id - 1].bestFeatures = '';
    this.listItemChosen[category_id - 1].price = '';
    this.listItemChosen[category_id - 1].id = '';
    this.getEstimate();
  }
  getEstimate() {
    this.EstimatedCosts = 0;
    for (let i = 0; i < 9; i++) {
      if (this.listItemChosen[i].price == '') {
        this.EstimatedCosts += 0
      } else {
        this.EstimatedCosts += this.listItemChosen[i].price
      }
    }
  }
  filterPrice(min: number, max: number) {
    // this.choseTypeProduct(category_id);
    this.listProductInModal = this.listProduct.filter((item: any) => {
      return item.price >= min && item.price < max;
    })
  }
  addToCart() {
    let id: any = localStorage.getItem('accountSignin');
    console.log(id);
    id = JSON.parse(id);
    let account: any;
    let listItemChosenFake: any = [
      { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
      { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
      { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
      { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
      { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
      { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
      { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
      { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
      { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
      { id: "", name: "", imgProduct: "", bestFeatures: [], price: "" },
    ];
    console.log(listItemChosenFake);
    if (JSON.stringify(this.listItemChosen) == JSON.stringify(listItemChosenFake)) {
      Swal.fire(
        'Looks like you have not selected any products yet',
        'Please choose a product'
      )
    } else {
      for (let i = 0; i < 9; i++) {
        let checkData: any = null;
        if (this.listItemChosen[i].name == '') {
        }
        else {
          this.productSer.getItem(parseInt(this.listItemChosen[i].id)).subscribe((data: any) => {
            account = this.acc;
            checkData = this.acc.cart.find((item: any) => {
              return item.id == parseInt(this.listItemChosen[i].id);
            })
            if (checkData) {
              checkData.quantity += 1;
              this.accountSer.editItem(this.acc, id).subscribe(() => {
                this.accountSer.getItem(id).subscribe((acc) => {
                  this.acc = acc;
                })
              });
            } else {
              this.acc.cart.push({ id: data.id, name: data.name, img: data.imgProduct, category_id: data.category_id, quantity: 1, price: data.price });
              this.accountSer.editItem(this.acc, id).subscribe(() => {
                this.accountSer.getItem(id).subscribe((acc) => {
                  this.acc = acc;
                })
              });
            }
          })
        }
      }

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your building has been added to cart',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['cart']);
    }


  }
}
