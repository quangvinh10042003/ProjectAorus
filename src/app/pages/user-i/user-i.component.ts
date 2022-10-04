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
 
  ngOnInit(): void {
  
  }
