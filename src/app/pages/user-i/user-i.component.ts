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
    document.documentElement.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this.accountID = localStorage.getItem("accountSignin")
    this.accountID = JSON.parse(this.accountID)
    this.app.getUser(this.accountID).subscribe((data: any) => {
      this.user = data
    })

  }
  signOut(){
    localStorage.removeItem('accountSignin');
    this.router.navigate(['/login'])

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
        this.app.deleteItem(this.accountID).subscribe();
        localStorage.removeItem('accountSignin');
        this.router.navigate(['/'])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
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
    }else if (e==4){
      this.signOut();
    }
  }
}