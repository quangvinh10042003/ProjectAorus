import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  time:number = 3;
  list: any = [];
  new: any = [];
  banner: any = [];
  constructor(private app: ItemService) { }
  ngOnInit() {
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
    setInterval(() => {
      if(this.time < 2){
        this.time = 0;
      }else{
        this.time = this.time - 1;
      }
    }, 1000);
    setTimeout(() => {
    }, 3000);
  }
}
