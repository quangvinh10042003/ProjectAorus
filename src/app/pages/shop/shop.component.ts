import { AccountService } from './../../services/account.service';
import { CategoryService } from './../../services/category.service';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  allProduct: any;
  listProduct: any;
  namePageCategory: any;
  firstClick: boolean = true;
  // logic chia page
  numberOfPage: any;
  check: any;
  pageNum: any;
  listPage: any = [];
  listAllProduct: any;
  startOfProduct: number = 0;
  endOfProduct: number = 9;
  lengthProduct: any;
  idCompare1: any;
  idCompare2: any;
  categoryId: any;
  numberItemCompare: number = 0;
  constructor(private accountSer: AccountService,private router: Router, private productSer: ProductsService, private actRoute: ActivatedRoute, private categorySer: CategoryService) { }

  ngOnInit(): void {
    this.idCompare1 = sessionStorage.getItem('itemCompare1');
    this.idCompare2 = sessionStorage.getItem('itemCompare2');

    if (this.idCompare1) {
      this.numberItemCompare += 1;
      document.getElementById(`compareButton${this.idCompare1}`)?.classList.add('compared');
    }
    if (this.idCompare2) {
      this.numberItemCompare += 1;
      document.getElementById(`compareButton${this.idCompare2}`)?.classList.add('compared');
    }
    let id: any;
    id = this.actRoute.snapshot.params['id'];
    if (id) {
      this.pageNum = 1;
      this.categorySer.getItem(id).subscribe((data: any) => {
        this.namePageCategory = data.name
      })
      this.getCategoryProduct(id);
    }
    else {
      this.pageNum = 1;
      this.getAll();
    }
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
  compareChoose1(id: number, category_id: number) {
    if (!this.idCompare1 && !this.idCompare2 && id != this.idCompare1 && id != this.idCompare2) {
      this.categoryId = category_id;
      if (this.categoryId == category_id || this.firstClick == true) {
        this.firstClick = false;
        this.numberItemCompare += 1;
        this.idCompare1 = id;
        sessionStorage.setItem('itemCompare1', this.idCompare1);
      } else {
        document.getElementById(`compareButton${id}`)?.classList.toggle('compared')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Can not compare 2 different types of products',
          showCancelButton: true,
          confirmButtonText: 'Clear All',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.clearAllCompare();
          }
        })
      }
    } else if (this.idCompare1 && !this.idCompare2 && id != this.idCompare1 && id != this.idCompare2) {
      if (this.categoryId == category_id || this.firstClick == true) {
        this.idCompare2 = id;
        this.numberItemCompare += 1;
        sessionStorage.setItem('itemCompare2', this.idCompare2);
      } else {
        document.getElementById(`compareButton${id}`)?.classList.toggle('compared')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Can not compare 2 different types of products',
          showCancelButton: true,
          confirmButtonText: 'Clear All',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.clearAllCompare();
          }
        })
      }
    } else if (!this.idCompare1 && this.idCompare2 && id !== this.idCompare1 && id != this.idCompare2) {
      if (this.categoryId == category_id || this.firstClick == true) {
        this.idCompare1 = id;
        this.numberItemCompare += 1;
        sessionStorage.setItem('itemCompare1', this.idCompare1);
      } else {
        document.getElementById(`compareButton${id}`)?.classList.toggle('compared')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Can not compare 2 different types of products',
          showCancelButton: true,
          confirmButtonText: 'Clear All',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.clearAllCompare();
          }
        })
      }
    }
    else if (id == this.idCompare1 && id != this.idCompare2) {
      this.idCompare1 = null;
      this.numberItemCompare -= 1;
      sessionStorage.removeItem('itemCompare1');
    } else if (id != this.idCompare1 && id == this.idCompare2) {
      this.idCompare2 = null;
      this.numberItemCompare -= 1;
      sessionStorage.removeItem('itemCompare2');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your Comparison is full',
      })
      document.getElementById(`compareButton${id}`)?.classList.toggle('compared')
    }
    document.getElementById(`compareButton${id}`)?.classList.toggle('compared')
  }
  clearAllCompare() {
    document.getElementById(`compareButton${this.idCompare1}`)?.classList.remove('compared')
    document.getElementById(`compareButton${this.idCompare2}`)?.classList.remove('compared')
    this.idCompare1 = null;
    this.idCompare2 = null;
    this.numberItemCompare = 0;
    sessionStorage.removeItem('itemCompare1');
    sessionStorage.removeItem('itemCompare2');
  }
  getAll(): void {
    this.productSer.getAll().subscribe((data: any) => {
      this.listProduct = data;
      this.allProduct = data;
      this.setUpPage();
    })
  }
  getCategoryProduct(id: number): void {
    this.productSer.getAll().subscribe((data: any) => {
      this.listProduct = data.filter((item: any) => {
        return item.category_id == id
      });
      this.setUpPage();
    })
  }
  setUpPage(): void {
    this.listPage = [];
    this.lengthProduct = this.listProduct.length;
    this.numberOfPage = Math.floor(this.lengthProduct / 12 + 1);
    for (let i = 0; i <= this.numberOfPage; i++) {
      if (i >= this.pageNum && i < this.pageNum + 5)
        this.listPage.push(i);
    }
    this.startOfProduct = this.pageNum * 12 - 12;
    this.endOfProduct = this.pageNum * 12;
  }
  openFilter(id: number) {
    document.getElementById(`Filter${id}`)?.classList.remove('d-none');
    document.getElementById(`button${id}`)?.classList.add('d-none');
    document.getElementById(`buttonClose${id}`)?.classList.remove('d-none');
  }
  closeFilter(id: number) {
    document.getElementById(`Filter${id}`)?.classList.add('d-none');
    document.getElementById(`button${id}`)?.classList.remove('d-none');
    document.getElementById(`buttonClose${id}`)?.classList.add('d-none');
  }
  navigate(id: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`shop/${id}`]);
    });
  }
  genFilter(name: string, id: number) {
    this.productSer.getAll().subscribe((data: any) => {
      this.listProduct = data.filter((item: any) => {
        return item.category_id == id
      });
      this.listProduct = this.listProduct.filter((data: any) => {
        return data.gen == name;
      })
      this.setUpPage();
    })
  }
  cpuFilter(name: string, id: number) {
    this.productSer.getAll().subscribe((data: any) => {
      this.listProduct = data.filter((item: any) => {
        return item.category_id == id
      });
      this.listProduct = this.listProduct.filter((data: any) => {
        return data.gpu == name;
      })
      this.setUpPage();
    })
  }
  ramFilter(name: number, id: number) {
    this.productSer.getAll().subscribe((data: any) => {
      this.listProduct = data.filter((item: any) => {
        return item.category_id == id
      });
      this.listProduct = this.listProduct.filter((data: any) => {
        return data.ram == name;
      })
      this.setUpPage();
    })
  }
  refresh_rateFilter(name: number, id: number) {
    this.productSer.getAll().subscribe((data: any) => {
      this.listProduct = data.filter((item: any) => {
        return item.category_id == id
      });
      this.listProduct = this.listProduct.filter((data: any) => {
        return data.refresh_rate == name;
      })
      this.setUpPage();
    })
  }
  amountFilter(name: any, id: number) {
    this.productSer.getAll().subscribe((data: any) => {
      this.listProduct = data.filter((item: any) => {
        return item.category_id == id
      });
      this.listProduct = this.listProduct.filter((data: any) => {
        return data.amount == name;
      })
      this.setUpPage();
    })
  }
  watFilter(name: any, id: number) {
    this.productSer.getAll().subscribe((data: any) => {
      this.listProduct = data.filter((item: any) => {
        return item.category_id == id
      });
      this.listProduct = this.listProduct.filter((data: any) => {
        return data.wattage == name;
      })
      this.setUpPage();
    })
  }
  SortLowToHigh(a: any, b: any) {
    let typeA = a.price;
    let typeB = b.price;
    let comparison = 0;
    if (typeA > typeB) {
      comparison = 1;
    } else if (typeA < typeB) {
      comparison = -1;
    }
    return comparison * -1;
  }
  SortHighToLow(a: any, b: any) {
    let typeA = a.price;
    let typeB = b.price;
    let comparison = 0;
    if (typeA > typeB) {
      comparison = 1;
    } else if (typeA < typeB) {
      comparison = -1;
    }
    return comparison * 1;
  }
  SortPrice(value: string) {
    this.firstPage()
    switch (value) {
      case "1": this.listProduct.sort(this.SortHighToLow); break;
      case "2": this.listProduct.sort(this.SortLowToHigh); break;
    }
  }
  firstPage() {
    this.pageNum = 1;
    this.chosePage(this.pageNum);
  }
  lastPage() {
    this.pageNum = this.numberOfPage;
    this.chosePage(this.pageNum);
  }
  nextPage() {
    if (this.pageNum <= this.numberOfPage - 1) {
      this.pageNum += 1;
      this.chosePage(this.pageNum);
    } else { }
  }
  prevPage() {
    if (this.pageNum > 1) {
      this.pageNum -= 1;
      this.chosePage(this.pageNum);
    } else { }
  }
  chosePage(page: number) {
    this.pageNum = page;
    this.startOfProduct = this.pageNum * 12 - 12;
    this.endOfProduct = this.pageNum * 12;
  }
}
