import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularSEM1';
  isLoading: boolean = false;
  constructor(private router: Router) { }
  ngOnInit() {
    if(!sessionStorage.getItem('isLoading')){
      this.isLoading = true; // Bật spinner
      this.loadData();
    }
  }
  loadData() {
    setTimeout(() => {
      this.isLoading = false; // Tắt spinner sau 3 giây
      sessionStorage.setItem('isLoading', 'false');
    }, 3000);
  }
}
