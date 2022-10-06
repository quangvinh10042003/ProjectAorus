import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewComponent implements OnInit {
  list: any = [
  ]
  constructor(private app: ItemService) { }

  ngOnInit(): void {
    this.app.getNew().subscribe(data => {
      this.list = data
  
    })
   
  }
  

}

