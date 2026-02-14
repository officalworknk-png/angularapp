import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';
declare var $: any

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, public object: MainObjectService) { }

  sidemenudata = [
    {
      label: "Home",
      url: "home",
      status: true,
      enum:"HOME"
    },
    {
      label: "Downline",
      url: "downline",
      status: true,
      enum:"DOWNLINE"

    },
    {
      label: "Tournament Mgmt",
      url: "tournament",
      status: true,
      enum:"TOURNAMENT_MGMT"

    },
    {
      label: "Banking",
      url: "banking",
      status: true,
      enum:"BANKING"

    },
    {
      label: "Payment",
      // url: "Payment",
      status: true,
      enum:"PAYMENT"

    },
    {
      label: "Bonus",
      url: "bonus",
      status: true,
      enum:"BONUS"

    },
    {
      label: "Signup Player",
      url: "signup-player",
      status: true,
      enum:"SIGNUP_PLAYER"

    },
    {
      label: "CMS",
      // url: "annoucement-management",
      status: true,
      enum:"CMS"

    },

  ]
  ngOnInit() {
    // this.object.getselfAccount()
    console.log("==>CALLLLLLLLLLLLLLLLL")

  }

  logout() {
    localStorage.clear()
    this.router.navigate(['admin'])

    this.object.isUser = false
    this.object.isAdmin = false
    this.object.isOwner = false
    this.object.isLogin = false

    this.object.getLoginUser()

  }

  gotopage(data) {
    console.log("==?",data)
    if(!data){return}
    this.router.navigate(['admin/' + data])

  }

}
