import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {
  user: any;
  accountSignIn: any;
  formGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
    ]),
    address: new FormControl(''),
    country: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z_.][a-zA-Z0-9]{0,10}@[a-z0-9]{4,10}\.[a-z]{2,5}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    phone: new FormControl(''),

  })
  get accountForm(): any {
    return this.formGroup.controls;
  }
  accountID: any;
  constructor(private app: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.accountID = JSON.parse(localStorage.getItem("accountSignin") as string)
    this.accountSignIn = localStorage.getItem('accountSignin');
    this.accountSignIn = JSON.parse(this.accountSignIn);
    if (this.accountSignIn) {
      this.app.getUser(this.accountSignIn).subscribe(data => {
        this.formGroup.patchValue(data);
      })
    }
  }
  submitForm() {
    Swal.fire({
      title: 'Do you want to save these edits?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        this.app.editData(this.formGroup.value, this.accountSignIn).subscribe(() => {
          this.router.navigate(['account']);
        })
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
