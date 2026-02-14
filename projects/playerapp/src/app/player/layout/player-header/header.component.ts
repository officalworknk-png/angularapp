import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-player-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class PlayerHeaderComponent implements OnInit {

  constructor(private fb: FormBuilder, public object: MainObjectService, public routeParam: ActivatedRoute,public router: Router) {
  }

  ngOnInit() {

    this.object.getselfAccount()
  }


  openSignupmodal(modalname) {
    this.object.getDOMInstance().showModal(modalname)
  }

  gotopage(url){
    this.router.navigate([url])
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
    this.object.isUser=false
    this.object.isAdmin=false
    this.object.isOwner=false
    this.object.isLogin=false

   this.object.getLoginUser()

  }
}
