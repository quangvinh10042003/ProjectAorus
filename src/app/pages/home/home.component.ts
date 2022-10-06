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
  constructor(private app: ItemService) { }

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
}
