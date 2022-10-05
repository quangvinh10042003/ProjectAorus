import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-i',
  templateUrl: './user-i.component.html',
  styleUrls: ['./user-i.component.css']
})
export class UserIComponent implements OnInit {
  user: any;
  account: any = {
    id: 1
  }
  accountID:any;
  constructor(private app: ItemService,private router: Router){}
  ngOnInit(): void {
    localStorage.setItem("accountSignin",JSON.stringify(this.account))
    this.accountID = localStorage.getItem("accountSignin")
    this.accountID = JSON.parse(this.accountID)
    this.app.getUser(this.accountID.id).subscribe((data: any) => {
      this.user = data 
    })
   
  }
  deleteUser(id:Number){
   this.app.deleteItem(this.accountID.id).subscribe()
   this.router.navigate(['/'])
  }
}