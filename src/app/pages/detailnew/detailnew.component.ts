import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-detailnew',
  templateUrl: './detailnew.component.html',
  styleUrls: ['./detailnew.component.css']
})
export class DetailnewComponent implements OnInit {
  nameNew: any
  constructor(private app: ItemService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id: any;
    id = this.actRoute.snapshot.params['id'];
    this.app.getDetailNew(id).subscribe((data: any) => {
      this.nameNew = data
    })
  }

}
