import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-detailblog',
  templateUrl: './detailblog.component.html',
  styleUrls: ['./detailblog.component.css']
})
export class DetailblogComponent implements OnInit {
  nameBlog: any
  constructor(private app: ItemService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    document.documentElement.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    let id: any;
    id = this.actRoute.snapshot.params['id'];
    this.app.getDetailBlog(id).subscribe((data: any) => {
      this.nameBlog = data
      

    })
  }

}
