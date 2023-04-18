import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkEye: boolean = true;

  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })

  constructor(private accountService: AccountService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.gotoTop();
    if (!this.formLogin?.valid) {
      return;
    }

  }

  get form(): any {
    return this.formLogin.controls
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  login(): void {
    this.accountService.getAll().subscribe((data) => {
      const user = data.find((a: any) => {
        return a.email === this.formLogin.value.email && a.password === this.formLogin.value.password;
      })
      if (!user) {
        document.getElementById('errorLogin')?.classList.remove('d-none');
      }
      else {
        localStorage.removeItem('accountSignin');
        localStorage.setItem('accountSignin', JSON.stringify(user.id))
        this.accountService.totalCard.next(user.cart.length);
        this.router.navigate([''])
      }
    })
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
