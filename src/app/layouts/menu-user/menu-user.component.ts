import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css']
})
export class MenuUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  signOut(){
    localStorage.removeItem('accountSignin');
    this.router.navigate(['/login'])

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
