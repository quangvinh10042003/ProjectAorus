import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  keyword1: string = '';
  keyword2: string = '';
  checkItem1: boolean = false;
  checkItem2: boolean = false;
  itemCompare1: any = {
    id: '',
    category_id: '',
    category_name: '',
    name: '',
    imgProduct: '',
    price: '',
    specifying: []
  };
  itemCompare2: any = {
    id: '',
    category_id: '',
    category_name: '',
    name: '',
    imgProduct: '',
    price: '',
    specifying: []
  };
  listProducts: any = [];
  listSpecifys: any;
  constructor(private productSer: ProductsService) { }

  ngOnInit(): void {
    document.documentElement.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    let id1 = sessionStorage.getItem('itemCompare1');
    let id2 = sessionStorage.getItem('itemCompare2');
    if (id1) {
      this.productSer.getItem(parseInt(id1)).subscribe(data => {
        this.itemCompare1 = data
        this.keyword1 = this.itemCompare1.name
      })

    }
    if (id2) {
      this.productSer.getItem(parseInt(id2)).subscribe(data => {
        this.itemCompare2 = data
        this.keyword2 = this.itemCompare2.name
      })
    }
    document.addEventListener('click', function handleClickOutsideBox(event: any) {
      let but1 = document.getElementById('searchItemCompare1') as HTMLDivElement | null;
      let but2 = document.getElementById('searchItemCompare2') as HTMLDivElement | null;
      let input1 = document.getElementById('inputCompare1') as HTMLInputElement| null;
      let input2 = document.getElementById('inputCompare2') as HTMLInputElement| null;
      // let box = document.getElementById('itemCompare') as HTMLDivElement | null;
      if (!but1?.contains(event.target) && !input1?.contains(event.target)) {
        but1?.classList.add('d-none');
      }
      if (!but2?.contains(event.target)  && !input2?.contains(event.target)) {
        but2?.classList.add('d-none');
      }
    });
    this.getAll();
  }
  getAll() {
    this.productSer.getAll().subscribe((data: any) => {
      this.listProducts = data;
    })
  }
  showsearchItemCompare(id: number) {
    document.getElementById(`searchItemCompare${id}`)?.classList.remove('d-none');
  }
  closeSearchItemCompare(id: number) {
    document.getElementById(`searchItemCompare${id}`)?.classList.add('d-none');
  }
  choseItemCompare(id: number, idInput: number) {
    if (idInput == 1) {
      this.productSer.getItem(id).subscribe(data => {
        this.itemCompare1 = data;
        this.keyword1 = this.itemCompare1.name;
      })
      this.closeSearchItemCompare(idInput);
    } else {
      this.productSer.getItem(id).subscribe(data => {
        this.itemCompare2 = data;
        this.keyword2 = this.itemCompare2.name;
      })
      this.closeSearchItemCompare(idInput);
    }
  }
  listSpecifing() {
    if (this.itemCompare1.category_id != this.itemCompare2.category_id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Can not compare 2 different types of products',
      })
    } else {
      this.listSpecifys = [];
      for (let i = 0; i < this.itemCompare1.specifying.length; i++) {
        this.listSpecifys.push({ name: this.itemCompare1.specifying[i].name, data1: this.itemCompare1.specifying[i].data, data2: '' })

      }
      for (let i = 0; i < this.itemCompare1.specifying.length; i++) {
        for (let j = 0; j < this.itemCompare2.specifying.length; j++) {
          if (this.itemCompare1.specifying[i].name == this.itemCompare2.specifying[j].name) {
            this.listSpecifys[i].data2 = this.itemCompare2.specifying[j].data;
          }
          else {
          }
        }
      }
    }


  }
  filterTypeProduct(id: any) {
    this.productSer.getAll().subscribe((data: any) => {
      this.listProducts = data.filter((item: any) => {
        return item.category_id == parseInt(id);
      });
    })

  }
}
