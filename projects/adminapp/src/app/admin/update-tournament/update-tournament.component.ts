import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';
import { ValidatorService } from 'core/services/validator.service';

declare var $:any
@Component({
  selector: 'app-update-tournament',
  templateUrl: './update-tournament.component.html',
  styleUrls: ['./update-tournament.component.scss']
})
export class UpdateTournamentComponent implements OnInit {

  tournamentdata: any;
  selectedTournamntData: any
  turnmentId: any;

  matchdata: any;
  selectedMatchData: any
  tournamentFormsetting: FormGroup;
  selectedRegisterUser: any;
  selectMatchIdResult: any;
  getRegisterTeam: any;
  filterApproveplayer: any;
  selectMatchIdgame: any;
  selectedParentMatch:any
  playerRegistertournament: any;
  loader: boolean=false;
  constructor(private fb: FormBuilder, public object: MainObjectService, public routeParam: ActivatedRoute, public router: Router) {
    this.object.activelink="TOURNAMENT_MGMT"

  }


  ngOnInit() {


    this.routeParam.params.subscribe(params => {
      this.turnmentId = params['id'];

      let gettab=  localStorage.getItem('admintournamentTab')

      // $(gettab+'-tab').addClass('active');
      $('#myTab button[ata-bs-target="' + gettab + '"]').tab('show');
      // console.log("---+++", this.turnmentId, params,'#'+gettab)

      if (this.turnmentId) {
        this.gettournamentdata()
        this.getmatchdata()
        this.updateTournamentSettingForm()
      }
    })

  }

  //*************************TOURNAMENT*********************************************/

  gettournamentdata() {
    var url: any

    if (this.object.isAdmin) {
      url = this.object.getURLInstance().admingetTournamentdata + "/" + this.turnmentId

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().admingetTournamentdata + "/" + this.turnmentId


    }
    else if (this.object.isUser) {
      return

    }

    // let param= "sex=female"
    let param = null

    this.object.get(url, param).subscribe((res: any) => {
      this.tournamentdata = res.data
      console.log("this.tournamentdata=====>", this.tournamentdata)
      this.showUpdatedValue()
    }, error => {
      this.object.setError(error)

    })

  }

  tournamentForm: FormGroup = new FormGroup({
    fulltnmentName: new FormControl(''),
    minPlayer: new FormControl(''),
    maxPlayer: new FormControl(''),
    contactEmail: new FormControl(''),
    tnmentdescription: new FormControl(''),
    tnmentRules: new FormControl(''),
    tnmentPrize: new FormControl(''),
    streamUrl: new FormControl(''),
    streamPlateform: new FormControl(''),
    streamProfileID: new FormControl(''),
    regEnable: new FormControl(''),
    regOpen: new FormControl(''),
    regClose: new FormControl(''),
  });

  updateTournamentSettingForm() {
    this.tournamentFormsetting = this.fb.group(
      {
        fulltnmentName: ['', Validators.required],
        minPlayer: ['', Validators.required],
        maxPlayer: ['', Validators.required],
        contactEmail: ['', Validators.required],
        tnmentdescription: ['',],
        tnmentPrize: ['',],
        tnmentRules: ['',],
        streamUrl: ['',],
        streamPlateform: ['',],
        streamProfileID: ['',],
        regEnable: [true, Validators.required],
        regOpen: ['', Validators.required],
        regClose: ['', Validators.required],
      });
  }

  showUpdatedValue() {
    if (this.tournamentdata.settings) {
      this.tournamentFormsetting.patchValue({
        fulltnmentName: this.tournamentdata.settings.fulltnmentName,
        minPlayer: this.tournamentdata.settings.minPlayer,
        maxPlayer: this.tournamentdata.settings.maxPlayer,
        contactEmail: this.tournamentdata.settings.contactEmail,
        tnmentdescription: this.tournamentdata.settings.tnmentdescription,
        tnmentPrize: this.tournamentdata.settings.tnmentPrize,
        tnmentRules: this.tournamentdata.settings.tnmentRules,
        streamUrl: this.tournamentdata.settings.streamUrl,
        streamPlateform: this.tournamentdata.settings.streamPlateform,
        streamProfileID: this.tournamentdata.settings.streamProfileID,
        regEnable: this.tournamentdata.settings.regEnable,
        regOpen: this.object.formatDate(this.tournamentdata.settings.regOpen),
        regClose: this.object.formatDate(this.tournamentdata.settings.regClose)

      })
    }
  }

  updatetnamentSetting() {
    console.log("==>", this.tournamentFormsetting)

    if (this.tournamentFormsetting.invalid) {
      this.tournamentFormsetting = ValidatorService.validationForm(this.tournamentFormsetting);
      return;
    }


    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminupdateTournamentSetting + '/' + this.turnmentId
    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().adminupdateTournamentSetting + '/' + this.turnmentId
    }

    let tournament = this.tournamentFormsetting.value

    // return
    this.object.post(url, tournament).subscribe(res => {
      // console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)

      this.gettournamentdata()


    }, error => {
      this.object.setError(error)

    })
  }

  //*************************MATCH*********************************************/

  getmatchdata() {
    var url: any

    if (this.object.isAdmin) {
      url = this.object.getURLInstance().admingettrnamentMatch + "/" + this.turnmentId

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().admingettrnamentMatch + this.turnmentId


    }
    else if (this.object.isUser) {
      return

    }

    this.object.get(url, null).subscribe((res: any) => {
      this.matchdata = res.data

        this.matchdata.map(ele=>{
        // const rows = [...ele.matchresult];  //sorting for username and status
      // rows.sort((a, b) => {
      //     return (a.score.localeCompare(b.score));
      // });
      // ele.matchresult = rows
    })

    // }
    console.log("+++++++++++++call=====>",  this.matchdata)

    }, error => {
      this.object.setError(error)

    })

  }

  openmodaladdmatch() {
    this.selectedMatchData = null
    // console.log(this.selectedMatchData)
    this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.addmatch)
  }

  matchForm: FormGroup = new FormGroup({
    round: new FormControl(''),
    matchNo: new FormControl(''),
    status: new FormControl(''),
    bye: new FormControl(''),   //team automatically advancing to the next round of tournament 
    // player1: new FormControl(''),
    // player2: new FormControl(''),
    // path: new FormControl(''),
    tournamentId: new FormControl(''),
    scoreCalculation: new FormControl(''),
    matchFormate: new FormControl(''),
    teamsPerMatch: new FormControl(''),
  });
  addmatch() {
    this.matchForm = this.fb.group(
      {
        round: ['', Validators.required],
        matchNo: ['', Validators.required],
        status: ['INACTIVE', Validators.required],
        bye: ['false', Validators.required],
        tournamentId: [' ', Validators.required],
        matchFormate: ['', Validators.required],
        scoreCalculation: ['', Validators.required],
        teamsPerMatch:['', Validators.required],

        // player1: ['match', Validators.required],
        // player2: ['match', Validators.required],
        // path: ['match', Validators.required]

      });

  }


  onAddmatch() {
    console.log("ADD MATCH==>", this.matchForm.value, )
    if (this.matchForm.invalid) {
      this.matchForm = ValidatorService.validationForm(this.matchForm);
      return;
    }
    this.addmatchdata()
  }

  addmatchdata() {
    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminaddnewMatch

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().adminaddnewMatch
    }
    console.log(this.matchForm.value)

    let match = this.matchForm.value

    match.tournamentId = this.turnmentId
    match.bye = false

    // match.player1 = "match"

    console.log(match)
    this.object.post(url, match).subscribe(res => {
      // console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.addmatch)

      this.getmatchdata()


    }, error => {
      this.object.setError(error)

    })
  }

  showUpdatedmatchModal(mainmatch,data) {
    this.selectedParentMatch=mainmatch
    this.selectedMatchData = data
    this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.addmatch)
    this.showUpdatedmatch()
    console.log("LOAD Update Match--",mainmatch,data)
  }
  showUpdatedmatch() {
    console.log(this.selectedMatchData, this.matchdata)
    this.matchForm.patchValue({
      round: this.selectedMatchData.round,
      matchNo: this.selectedMatchData.matchNo,
      status: this.selectedMatchData.status,
      bye: this.selectedMatchData.bye,
    })
  }

  updatematch(userId) {

    if (this.matchForm.invalid) {
      return;
    }
    var data = {
    round: this.matchForm.value.round,
    matchNo: this.matchForm.value.matchNo,
    status: this.matchForm.value.status,
    bye: this.matchForm.value.bye,
    matchparentId:this.selectedParentMatch._id,
    tournamentId:this.selectedParentMatch.tournamentId,
    subMatchId:this.selectedMatchData._id
  }

    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminupdateMatch + "/" + this.selectedParentMatch._id

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().adminupdateMatch + "/" + this.selectedParentMatch._id
    }
    console.log("==+++>",data,this.selectedMatchData, this.matchForm.value)

    this.object.post(url, data).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.addmatch)

      this.getmatchdata()


    }, error => {
      this.object.setError(error)

    })
  }

  deleteMatch(deletetype,data,parentmatchdata) {
    var url: any
    var body
    console.log("===+++",deletetype, data,parentmatchdata)

    if(deletetype=='All'){
      if (this.object.isAdmin) {
        url = this.object.getURLInstance().admindeleteallMatch + '/' + data._id

      }
      else if (this.object.isOwner) {
        url = this.object.getURLInstance().ownerdeleteuser + '/' + data._id

      }
      body={
       parentId: data._id
      }

    }else{
        if (this.object.isAdmin) {
          url = this.object.getURLInstance().admindeleteMatch + '/' + parentmatchdata._id

        }
        else if (this.object.isOwner) {
          url = this.object.getURLInstance().ownerdeleteuser + '/' + parentmatchdata._id
        }

        body={
          matchId:  data._id,
          parentId: parentmatchdata._id,
         }
  }

    console.log("==>",body)
    this.object.post(url,body).subscribe(res => {
      this.object.getDOMInstance().success(res.message)
      this.getmatchdata()

    }, error => {
      this.object.setError(error)

    })

  }

  //*************************END MATCH*********************************************/


  //*************************JOIN PARTICIPANT *********************************************/

  participantdata = []

  //*************************Player Registraion *********************************************/

  updatedRegisterTeamStatus(selctuser) {
    this.selectedRegisterUser = selctuser
    this.getUserStatus = null
    this.remarktext = null
    this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.tnmanetregisteruser)
  }
  remarktext: string
  getUserStatus: string
  getStatuas(data) {
    console.log(data)
    this.getUserStatus = data

  }


  updateRegisterUser() {

    let url = this.object.getURLInstance().adminupdateregisterTournament + '/' + this.turnmentId

    var registerTeam = this.selectedRegisterUser
    registerTeam.registrationStatus = this.getUserStatus
    registerTeam.remark = this.remarktext


    let data = {
      registerTeam: registerTeam
    }
    console.log(data)
    this.object.post(url, data).subscribe(res => {
      console.log("updateRegisterUser=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.tnmanetregisteruser)
    }, error => {
      this.object.setError(error)

    })
  }

  //**********************Result***************************/

  selectMatchOption(data) {
    this.selectMatchIdResult = data
    console.log(data)
    this.showupdateResultForm()
    
  }

  showupdateResultForm() {
    const filterdata = this.matchdata.map(elem => {
      const match = elem.allMatches.find(ele => ele._id == this.selectMatchIdResult);
      return match ? { ...elem, allMatches: [match] } : null;
    }).find(res => res !== null);
    

    // console.log("matchdata==>",filterdata,this.matchdata)
    
    // if (filterdata.matchresult.length > 0) {
      this.getRegisterTeam = filterdata



  }




  submitfinalResult() {

    // if (this.matchForm.invalid) {
    //   return;
    // }
   

    console.log("getRegisterTeam===>",this.getRegisterTeam)

    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminsetresultMatch + "/" + this.getRegisterTeam._id

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().adminsetresultMatch + "/" + this.getRegisterTeam._id
    }

    var data = {
      matchresult: this.getRegisterTeam
    }

    console.log(this.getRegisterTeam,data,)
    this.object.post(url, data).subscribe(res => {
      this.object.getDOMInstance().success(res.message)
      // this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.addmatch)
      this.getmatchdata()
    }, error => {
      this.object.setError(error)

    })
  }

  //************************************Store Tab value ***************************/
  storeTab(data){
    console.log("==>",data)
    if(data=='registration'){
      this.getRegisterPlayer()

    }
    else if(data=='playerbanking'){
    this.loader=true

      this.getRegisterPlayer()
      setTimeout(() => {
          this.getUserBankingdata()
      }, 1000);

    }
    localStorage.setItem('admintournamentTab',data)
  }




  refreshlist(){
    this.getRegisterPlayer()

  }

// *********************GET REGISTRATION INFO*****************
  getRegisterPlayer(){
      var url: any
      if (this.object.isAdmin) {
        url = this.object.getURLInstance().gettrnamentPlayerRegister + "/" + this.turnmentId
  
      }
      else if (this.object.isOwner) {
        url = this.object.getURLInstance().admingettrnamentMatch + this.turnmentId
  
  
      }
      else if (this.object.isUser) {
        return
      }
      this.object.get(url, null).subscribe((res: any) => {

       this.playerRegistertournament=res.data
      
      }, error => {
        this.object.setError(error)
  
      })
  
  }


  //****************************Banking Register PLayer Banking ************************/
  userdata: any
  userId: any;
  userdetail: any;
  selectedUser: any;
  orignalUserdata: any;
  messageresponse: any;
  getUserBankingdata() {

    var url: any

    if (this.object.isAdmin) {
      url = this.object.getURLInstance().gettrnamentRegisterPlayer + "/" + this.turnmentId
      

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().ownergetallUser

    }
    else if (this.object.isUser) {
      return

    }
    

    this.object.get(url, null).subscribe((res:any) => {
      this.loader=false

    res.data.map(ele=>{
        ele.isDeposite=false
        ele.isWidthraw=false
        ele.bankingOption=null
      })
      
      this.orignalUserdata = [...res.data]
      console.log("==<this.playerRegistertournament.",this.playerRegistertournament)
      res.data.map(ele=>{
        this.playerRegistertournament.forEach(elem=>{
          if(ele._id==elem.userId){
            ele.teamInfo=elem
          }
        })   
      })

      this.userdata = res.data
      console.log("GET banking=====>", this.userdata)
    }, error => {
      this.loader=false
      this.object.setError(error)

    })


  
  }

  searchUser(){
    this.userdata
  }


    /**
     * @param child : ChildUser Object.
     * @param index : ChildUser Index.
     * @param userId : ChildUSerId.
     * @description
     * Click on Deposite (D) button on banking.
     */
     isDepositesection(i) {

      // var index = this.userdata.findIndex(x => x._id == child._id)
       console.log(this.userdata[i].isDeposite)
  
       this.userdata[i].isDeposite=  this.userdata[i].isDeposite ? false :true

       if (this.userdata[i].isDeposite) {
        this.userdata[i].isWidthraw=false
      } else {
        this.userdata[i].bankingOption = null;
        this.userdata[i].userBalance = null;
      }

  }

    /**
     * @param child : ChildUser Object.
     * @param index : ChildUser Index.
     * @param userId : ChildUSerId.
     * @description
     * Click on Deposite (D) button on banking.
     */
     isWidthrawsection(i) {

      // var index = this.userdata.findIndex(x => x._id == child._id)
       console.log(this.userdata,i)
  
       this.userdata[i].isWidthraw=  this.userdata[i].isWidthraw ? false :true
        if (this.userdata[i].isWidthraw) {
            this.userdata[i].isDeposite=false
          } else {
            this.userdata[i].bankingOption = null;
            this.userdata[i].userBalance = null;
          }

  }

  submitbankingDetail(){
    var obj=[]
    console.log("Banking===",this.userdata)
    this.userdata.map(ele=>{
      if((ele.isDeposite || ele.isWidthraw) && ele.amount){
        obj.push({...ele,parentName:this.object.getUserdetails.name,parentId:this.object.getUserdetails._id})
      }
    })

    if(obj.length==0){
      this.object.getDOMInstance().error("Please select one user atleast for Banking")
      return
    }

    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminBanking 

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().adminBanking 
    }

    // return obj
    this.object.post(url, obj).subscribe(res => {
      console.log("call=====>", res)
      this.messageresponse=res.body
      this.getUserBankingdata()
      setTimeout(() => {
        this.messageresponse=[]
      }, 25000);
      this.object.getDOMInstance().success( res.message)
    }, error => {
      this.object.setError(error)

    })

  }

  clearbankingDetail(){

    this.orignalUserdata= this.orignalUserdata.map(v => ({
      ...v, isDeposite: false, isWidthraw: false, bankingOption: null, userBalance: null,remark:null

  }))
      this.userdata=this.orignalUserdata
    console.log("==>",this.userdata,this.orignalUserdata)

  }



  refreshbankingDetail(){
    this.getUserBankingdata()
    this.createLogDb()
  }

  createLogDb(){
   var url = this.object.getURLInstance().adminUpdateInfoBanking 
  var  obj=this.userdata
  
    this.object.post(url, obj).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success( res.message)
    }, error => {
      this.object.setError(error)

    })
  }



  
}
