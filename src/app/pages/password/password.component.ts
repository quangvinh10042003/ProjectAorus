import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  checkEye1: boolean = true;
  checkEye2: boolean = true;
  checkEye3: boolean = true;
  dataFormGroup: any;
  accountSignin: any;
  getCart: any;
  formForEnter = new FormGroup({
    currentPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  })

  formGroup = new FormGroup({
    fullName: new FormControl('', [

    ]),
    address: new FormControl(''),
    email: new FormControl('', [

    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    country:new FormControl(''),
    phone: new FormControl(''),
    cart: new FormControl([]),
    history: new FormControl([])

  })
  constructor(private app: ItemService, private route: Router) { }
  get form(): any {
    return this.formForEnter.controls;
  }

  ngOnInit(): void {
    document.documentElement.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this.accountSignin = localStorage.getItem('accountSignin');
    this.accountSignin = JSON.parse(this.accountSignin);
    console.log(this.accountSignin)
    if (this.accountSignin) {
      this.app.getUser(this.accountSignin).subscribe((data: any) => {
        this.formGroup.patchValue(data);
        this.dataFormGroup = this.formGroup.value;
      })
    }
  }
  submit() {
    let labelErr2 = document.getElementById('labelErr2') as HTMLLabelElement | null;
    let labelErr3 = document.getElementById('labelErr3') as HTMLLabelElement | null;
    let labelErr1 = document.getElementById('labelErr1') as HTMLLabelElement | null;

    this.app.getUser(this.accountSignin).subscribe((data: any) => {
      if (this.form.currentPassword.value == data.password) {
        if (this.form.newPassword.value == this.form.currentPassword.value) {
          labelErr2?.classList.remove('d-none');
          return
        }
        else if (this.form.newPassword.value == this.form.confirmPassword.value) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your slide has been saved',
            showConfirmButton: false,
            timer: 1000
          })
          this.dataFormGroup.password = this.form.newPassword.value;
          this.app.editData(this.dataFormGroup, this.accountSignin).subscribe();
          this.route.navigate(['user']);
        } else {
          labelErr3?.classList.remove('d-none');
          return
        }
      } else {
        labelErr1?.classList.remove('d-none');
        return
      }
    })
  }
  hideErr(id: string, icon: string) {
    let labelErr2 = document.getElementById('labelErr2') as HTMLLabelElement | null;
    let labelErr3 = document.getElementById('labelErr3') as HTMLLabelElement | null;
    let labelErr1 = document.getElementById('labelErr1') as HTMLLabelElement | null;
    labelErr1?.classList.add('d-none');
    labelErr2?.classList.add('d-none');
    labelErr3?.classList.add('d-none');
    let buttonEye = document.getElementById(icon) as HTMLDivElement | null;
    let inputPass = document.getElementById(id) as HTMLInputElement | null;
    if (inputPass?.value == '') {
      buttonEye?.classList.add('d-none');
    } else {
      buttonEye?.classList.remove('d-none');
    }
  }
  showPass(checkEye: number, input: string, icon: string) {
    let inputPass = document.getElementById(input) as HTMLInputElement | null;
    let eye = document.getElementById(icon) as HTMLDivElement | null;
    switch (checkEye) {
      case 1:
        if (this.checkEye1 == true) {
          inputPass?.setAttribute('type', 'text');
          eye?.setAttribute('class', 'fa-solid fa-eye-slash');
          this.checkEye1 = false;
        } else {
          inputPass?.setAttribute('type', 'password');
          eye?.setAttribute('class', 'fa-solid fa-eye');
          this.checkEye1 = true;
        }
        break;
      case 2:
        if (this.checkEye2 == true) {
          inputPass?.setAttribute('type', 'text');
          eye?.setAttribute('class', 'fa-solid fa-eye-slash');
          this.checkEye2 = false;
        } else {
          inputPass?.setAttribute('type', 'password');
          eye?.setAttribute('class', 'fa-solid fa-eye');
          this.checkEye2 = true;
        }
        break;
      case 3:
        if (this.checkEye3 == true) {
          inputPass?.setAttribute('type', 'text');
          eye?.setAttribute('class', 'fa-solid fa-eye-slash');
          this.checkEye3 = false;
        } else {
          inputPass?.setAttribute('type', 'password');
          eye?.setAttribute('class', 'fa-solid fa-eye');
          this.checkEye3 = true;
        }
        break;
    }

  }
  changeRouter(e: any) {
    if (e == 1) {
      this.route.navigate(['user'])
    } else if (e == 2) {
      this.route.navigate(['usersetting'])
    } else if (e == 3) {
      this.route.navigate(['history'])
    }
  }
}
