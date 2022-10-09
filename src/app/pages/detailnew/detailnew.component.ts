import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-detailnew',
  templateUrl: './detailnew.component.html',
  styleUrls: ['./detailnew.component.css']
})
export class DetailnewComponent implements OnInit {
  nameNew: any = { name: '', id: '' };
  nextNew: any = { name: '', id: '' };
  prevNew: any;
  constructor(private app: ItemService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    document.documentElement.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    let id: any;
    id = this.actRoute.snapshot.params['id'];
    this.app.getDetailNew(id).subscribe((data: any) => {
      this.nameNew = data
    })
    this.app.getDetailNew(parseInt(id) + 1).subscribe((data: any) => {
      this.nextNew = data;
    })
    if (id > 1) {
      this.app.getDetailNew(parseInt(id) - 1).subscribe((data: any) => {
        this.prevNew = data;
      })
    }
  }
  navigate(id: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      let idRouter: any;
      idRouter = this.actRoute.snapshot.params['id'];
      this.app.getDetailNew(idRouter).subscribe((data: any) => {
        this.nameNew = data
      })
      this.router.navigate([`new/${id}`]);
    });
  }

}
