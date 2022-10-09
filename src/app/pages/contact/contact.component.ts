import  Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    document.documentElement.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
  submit(e: any) {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Thank you for responding. We will contact you soon',
      showConfirmButton: false,
      timer: 1500
    })
    e.preventDefault()

  }
}
