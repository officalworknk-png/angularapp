import { Component, OnInit,  } from '@angular/core';
import { Router,  } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public object: MainObjectService,public router:Router) {
   
   }

  ngOnInit() {
    

 
  }
 
}
