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
  accountID: any;
  constructor(private app: ItemService, private router: Router) { }
  ngOnInit(): void {
    localStorage.setItem("accountSignin", JSON.stringify(1))
    this.accountID = localStorage.getItem("accountSignin")
    this.accountID = JSON.parse(this.accountID)
    this.app.getUser(this.accountID).subscribe((data: any) => {
      this.user = data
    })

  }
  deleteUser(id: Number) {
    Swal.fire({
      title: 'Do you want to delete account?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        this.app.deleteItem(this.accountID).subscribe()
        this.router.navigate(['/'])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
        this.router.navigate(['account']);
      }
    })

  }
  changeRouter(e: any) {
    if (e == 1) {
      this.router.navigate(['user'])
    } else if (e == 2) {
      this.router.navigate(['usersetting'])
    } else if (e == 3) {
      this.router.navigate(['history'])
    }
  }
}