import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userId: any;
  userdetail: any;
  selectedUser: any;

  constructor(public object: MainObjectService, public router: Router,private fb: FormBuilder) { 
    this.object.activelink="HOME"

  }

  ngOnInit() {
    
  }


}
