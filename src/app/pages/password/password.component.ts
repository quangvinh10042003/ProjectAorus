import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  accountSignIn: any;
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
    name: new FormControl('', [

    ]),
    address: new FormControl(''),
    email: new FormControl('', [

    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    access: new FormControl(false),
    gender: new FormControl('different'),
    telephoneNumber: new FormControl(''),
    cart: new FormControl([]),
    history: new FormControl([])

  })
  constructor() { }
  get form(): any {
    return this.formForEnter.controls;
  }
  submit(){
    
  }
  ngOnInit(): void {
  }
  hideErr(id:string,icon:string) {
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
  showPass(checkEye:number,input:string, icon:string) {
    let inputPass = document.getElementById(input) as HTMLInputElement | null;
    let eye = document.getElementById(icon) as HTMLDivElement | null;
    switch(checkEye){
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
}
