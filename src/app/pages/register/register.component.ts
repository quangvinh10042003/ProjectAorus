import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  checkEye: boolean = true;

  formIn4 = new FormGroup({
    email:new FormControl('',[
      Validators.required,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"),
    ]),
    fullName:new FormControl('',[
      Validators.required,
    ]),
    phone:new FormControl('',[
      Validators.required,
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
    ]),
    password:new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ]),
    address:new FormControl(''),
    country:new FormControl(''),
    cart:new FormControl([]),
    history:new FormControl([]),
  })

  constructor(private http:HttpClient,private accountService:AccountService,private router:Router) { }

  ngOnInit(): void {
    document.documentElement.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    if (!this.formIn4?.valid) {
      return;
    }
  }
  register():void{
    this.accountService.addItem(this.formIn4.value).subscribe((data)=>{
      this.formIn4.reset();
      this.router.navigate(['login'])
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successful account registration',
        showConfirmButton: false,
        timer: 1500
      })
    })
  } 
  get form():any{
    return this.formIn4.controls;
  }
  showEye() {
    let buttonEye = document.getElementById('showText') as HTMLDivElement | null;
    let inputPass = document.getElementById('password') as HTMLInputElement | null;
    if (inputPass?.value == '') {
      buttonEye?.classList.add('d-none');
    } else {
      buttonEye?.classList.remove('d-none');
    }
  }
  showPass() {
    let inputPass = document.getElementById('password') as HTMLInputElement | null;
    let eye = document.getElementById('eye') as HTMLDivElement | null;
    if (this.checkEye == true) {
      inputPass?.setAttribute('type', 'text');
      eye?.setAttribute('class', 'fa-solid fa-eye-slash');
      this.checkEye = false;
    } else {
      inputPass?.setAttribute('type', 'password');
      eye?.setAttribute('class', 'fa-solid fa-eye');
      this.checkEye = true;
    }
  }

}
