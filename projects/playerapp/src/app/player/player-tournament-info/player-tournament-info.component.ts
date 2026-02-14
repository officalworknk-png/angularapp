import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-player-tournament-info',
  templateUrl: './player-tournament-info.component.html',
  styleUrls: ['./player-tournament-info.component.scss']
})
export class PlayerTournamentInfoComponent implements OnInit {
  turnmentId: string;
  tournamentdata: any;
  teamUsertdata: any;
  userDetail: any;
  playerRegisterdetail: any;
  matchdata: any;

  constructor(private fb: FormBuilder, public object: MainObjectService, public routeParam: ActivatedRoute,public router: Router) {

  }
  ngOnInit() {
    this.userDetail=JSON.parse(localStorage.getItem("userdata"))

    this.routeParam.params.subscribe(params => {
      this.turnmentId = params['id'];
      console.log("---+++",this.turnmentId ,params)

      if(this.turnmentId){
        this.gettournamentdata()
        this.getMatchdata()
        this.getRegisterPlayer()
      }
    })
  }

  //**************************Tournament Info********************************** */
  gettournamentdata() {
    var url: any
      url = this.object.getURLInstance().usergetTournamentdata+"/"+this.turnmentId

    // let param= "sex=female"
    let param= null

    this.object.get(url,param).subscribe((res: any) => {
      console.log(" this.tournamentdata=====>", res)
      this.tournamentdata = res.data
      this.getRegisterdata()
    }, error => {
      this.object.setError(error)

    })

  }

  //**************************Get Player register  Info if alrady register ********************************** */
  getRegisterdata(){
    if(!this.object.isLogin){return}
     var data=  this.tournamentdata.registerTeam.find(ele=> ele.userId==this.userDetail._id)
     this.playerRegisterdetail=data
      console.log(data)
  }


  //**************************Registration For Tournament********************************** */

  registerTournamentcheck(){
    if(!this.object.isLogin){
    this.object.getDOMInstance().showModal("player-login")
    }
    else{
    this.object.getDOMInstance().showModal("register-tournament")

      // this.registertournament()
      this.getTeamdetails()
      
    }
  }

  
  //**************************Get My team Detail********************************** */

  getTeamdetails(){
    var url: any
    url = this.object.getURLInstance().usergetregisterTeam 

  this.object.get(url, null).subscribe((res: any) => {
    this.teamUsertdata = res.data[0]
    // this.teamUsertdata = null

    if(this.teamUsertdata){
     let data  = this.teamUsertdata.players.filter(ele=> ele.active )
     this.teamUsertdata.players=data
     console.log(this.teamUsertdata)
    }
    else{
      this.object.getDOMInstance().error("Please add team  first then Register")

    }

    // console.log("==.",this.teamUsertdata)
  }, error => {
    this.object.setError(error)

  })
  }

  //**************************finaly Register for tournament********************************** */

  finalregistertournament(){

    console.log(this.teamUsertdata, this.tournamentdata.settings,
      this.tournamentdata.settings.minPlayer ,this.teamUsertdata.players.length)

    if(!this.teamUsertdata){
      return this.object.getDOMInstance().error("Please add team  first then Register")
    }
    else if(this.tournamentdata.settings.minPlayer > this.teamUsertdata.players.length){
      return this.object.getDOMInstance().error('Please add active minimum'+ this.tournamentdata.settings.minPlayer+' player for register')

    }
    else if(this.tournamentdata.settings.maxPlayer < this.teamUsertdata.players.length){
      return this.object.getDOMInstance().error('Please add only ' + this.tournamentdata.settings.maxPlayer+' active maximum player for register')

    }
    
  
    
    var url: any
    url = this.object.getURLInstance().userregisterTournament+"/"+this.turnmentId
     
    var data:any
     data=this.teamUsertdata,
     data.turnmentId= this.turnmentId

    console.log("registerTeam-----",data)
    this.object.post(url, data).subscribe(res => {
    this.object.getDOMInstance().success(res.message)
    this.gettournamentdata()
  }, error => {
    alert(error.error.message)
    this.object.setError(error)

  })

  

  }

  //**************************cancel  Register for tournament********************************** */

  cancelregistertournament(){
  let url=this.object.getURLInstance().usercancelegisterTournament+'/'+this.turnmentId
    this.object.post(url, {}).subscribe(res => {

      this.object.getDOMInstance().success(res.message)

    }, error => {
      this.object.setError(error)

    })
  }

  //**************************get Match data for tournament********************************** */

  getMatchdata(){
    // if(!this.object.isUser){return}
      var url: any
      url = this.object.getURLInstance().usergettrnamentMatch+"/"+this.turnmentId
      console.log(url)
      this.object.get(url, null).subscribe((res: any) => {
        console.log("matchdata=====>", res)
        this.matchdata = res.data
      }, error => {
        this.object.setError(error)
  
      })
  
  }


  // *********************GET REGISTRATION INFO*****************
  getRegisterPlayer(){
    if(!this.object.isLogin){return}

    var url: any

    url = this.object.getURLInstance().gettrnamentPlayerRegister + "/" + this.turnmentId
    this.object.get(url, null).subscribe((res: any) => {
    console.log("getRegisterPlayer++++call=====>", res.data)
    }, error => {
      this.object.setError(error)

    })

}

}
