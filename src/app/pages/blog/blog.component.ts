import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  list: any = [
  ]
  constructor(private app: ItemService) { }

  ngOnInit(): void {
    this.app.getBlog().subscribe(data => {
      this.list = data
    })
  }

}
