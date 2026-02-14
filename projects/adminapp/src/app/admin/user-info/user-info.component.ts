import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userId: any;
  userdata: any;
  teamPlayertdata: any;
  tournamentRegdata: any;
  accountStatemtndata: any;
  constructor(private fb: FormBuilder, public object: MainObjectService, public routeParam: ActivatedRoute, public router: Router) {
    // this.object.activelink="TOURNAMENT_MGMT"

  }

  ngOnInit() {

    this.routeParam.params.subscribe(params => {
      this.userId = params['id'];

      this.getUserdata()
    })

  }

  storeTab(data){
    console.log("==>",data)
    if(data=='teamInfo'){
      this.getTeamdetails()
    }
    else if(data=='registration'){
    this.playerRegistertournament()
    }
    else if(data=='account-statemnt'){
      this.accountStatemnt()
    }


    
    localStorage.setItem('userdownlineTab',data)
  }

  getUserdata() {
    var url: any

    if (this.object.isAdmin) {
      url = this.object.getURLInstance().admingetUserdetail+ "/" +this.userId
      

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().admingetUserdetail+ "/" +this.userId

    }
    else if (this.object.isUser) {
      return

    }

    this.object.get(url, this.userId).subscribe((res:any) => {
      this.userdata = res
      console.log("call=====>", this.userdata,res)
    }, error => {
      this.object.setError(error)

    })

  }

  //-------------------------Get Team Info-------------------//


  getTeamdetails(){
    var url: any
    url = this.object.getURLInstance().adminusergetregisterTeam+ "/" +this.userId

  this.object.get(url, this.userId).subscribe((res: any) => {
    this.teamPlayertdata = res.data[0]
    console.log("Team detail ---->", this.teamPlayertdata)
  }, error => {

    this.object.setError(error)

  })
  }


  //-------------------------Get Team Info-------------------//
  playerRegistertournament(){
    var url: any
    url = this.object.getURLInstance().admingetalltrnamentRegisterPlayer+ "/" +this.userId
    this.object.get(url, this.userId).subscribe((res: any) => {
    this.tournamentRegdata = res.data
    console.log("tournamentRegdata detail ---->", this.tournamentRegdata)
  }, error => {

    this.object.setError(error)

  })
  }


  accountStatemnt(){
    var url: any
    url = this.object.getURLInstance().admingetwalletTransaction+ "/" +this.userId
    this.object.get(url, this.userId).subscribe((res: any) => {
    this.accountStatemtndata = res.data
    console.log("tournamentRegdata detail ---->", this.accountStatemtndata)
  }, error => {

    this.object.setError(error)

  })
  }

  viewtournamentDetail(data){
    
  }

}
