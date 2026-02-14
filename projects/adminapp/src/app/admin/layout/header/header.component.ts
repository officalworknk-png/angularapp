import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';
declare var $:any 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sidemenudata: boolean=true;
  isExcelEnabled=true

  constructor(private router:Router,public object:MainObjectService) { }

  ngOnInit() {
    this.object.getselfAccount()

  }


getExportDownload(){

}
getPdfDownload(){

}
showCreateAdmin(){

}
 

  logout(){
    this.object.isUser=false
    this.object.isAdmin=false
    this.object.isOwner=false
    this.object.isLogin=false
    localStorage.clear()
    this.router.navigate(['/'])

   


  }

  gotopage(data){
    this.router.navigate(['home/'+data])

  }

  sidemenu(){
    this.sidemenudata=this.sidemenudata ? false : true
    var webclass = document.getElementById("sidebar")
    if(webclass){

      if(this.sidemenudata){
        webclass.classList.add("active")
      }
      else{
        webclass.classList.remove("active")

      }
    }

  }
}
