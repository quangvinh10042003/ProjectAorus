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
    let id: any;
    id = this.actRoute.snapshot.params['id'];
    this.app.getDetailBlog(id).subscribe((data: any) => {
      this.nameBlog = data
      

    })
  }

}
