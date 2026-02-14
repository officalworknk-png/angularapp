import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from 'core/services/index.service';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-player-team',
  templateUrl: './player-team.component.html',
  styleUrls: ['./player-team.component.scss']
})
export class PlayerTeamComponent implements OnInit {
  playerlist: FormArray;
  teamUsertdata:any=[]
  userDetail: any;
submitted = false;

  constructor(private fb: FormBuilder, public object: MainObjectService, public routeParam: ActivatedRoute,public router: Router) {
  }

  teamCreateForm: FormGroup = new FormGroup({
    teamName: new FormControl(''),
    teamLeader: new FormControl(''),
    region: new FormControl(''),
    whatsupno: new FormControl(''),
    email: new FormControl(''),
    teamImage: new FormControl(''),
    players:new FormControl('')
  });
  ngOnInit() {

    this.userDetail=JSON.parse(localStorage.getItem("userdata"))

    this.teamCreateForm = this.fb.group(
      {
        teamName: ['', Validators.required],
        // teamLeader: ['', Validators.required],
        email: ['',Validators.required],
        teamImage: ['', ],
        // region: ['', Validators.required],
        whatsupno: ['', Validators.required],
        players: this.fb.array([])
      });

    

    this.getTeamdetails()

  }

  getTeamdetails(){
    var url: any
    console.log(this.userDetail)
    url = this.object.getURLInstance().usergetregisterTeam 

  this.object.get(url, null).subscribe((res: any) => {
    this.teamUsertdata = res.data[0]
    if(this.teamUsertdata){
      this.setTeamvalue()
    }
    else{
        this.adddefaultPlayer()
    }
  }, error => {
    this.adddefaultPlayer()

    this.object.setError(error)

  })
  }

  setTeamvalue(){

    this.playerlist = this.teamCreateForm.get('players') as FormArray;
   
    this.teamUsertdata.players.map(ele=>{
      console.log("calll====>")
      this.playerlist.push(this.fb.group({
           playerName : ['',Validators.required],
           uid : ['',Validators.required],
           discordUserName : ['',Validators.required],
           active : [false,Validators.required]
         }));
        })


    this.teamCreateForm.patchValue({
      teamName: this.teamUsertdata.teamName,
      whatsupno: this.teamUsertdata.whatsupno,
      email: this.teamUsertdata.email,
      players: this.teamUsertdata.players,
    })


    console.log("---->",this.teamUsertdata,this.teamUsertdata.value)
  }

  updateteam(){
    if (this.teamCreateForm.invalid) {
      this.teamCreateForm = ValidatorService.validationForm(this.teamCreateForm);
      return;
    }

    var url: any
    url = this.object.getURLInstance().userupdateTeam+"/"+this.teamUsertdata._id
    console.log(this.object.getUserdetails,this.teamCreateForm.value)
    
   let data= this.teamCreateForm.value
   data.userId=this.object.getUserdetails._id
    
  this.object.post(url, data).subscribe(res => {
    this.object.getDOMInstance().success(res.message)
    
  }, error => {
    this.object.setError(error)

  })
  }


  adddefaultPlayer(){
    this.playerlist = this.teamCreateForm.get('players') as FormArray;
    for(let i=0;i<1;i++){
    this.playerlist.push(this.fb.group({
       playerName : ['',Validators.required],
       uid : ['',Validators.required],
       discordUserName : ['',Validators.required],
       active : [true,Validators.required]

     }));
   }
 
   }

  addPlayer(){
    if (this.playerlist.length > 8) { return}

   this.playerlist.push(this.fb.group({
      playerName : ['',Validators.required],
      uid : ['',Validators.required],
      discordUserName : ['',Validators.required],
      active : [false,Validators.required]
    }));


  }


  removePlayer(index){
    console.log(index)
    if (this.playerlist.length !== 1) {
      this.playerlist.removeAt(index);
  }
  }

  get f() { return this.teamCreateForm.controls; }
  onSubmit() {

    // console.log("==>",this.teamCreateForm.value)
    // if(this.teamCreateForm.value.players){
    //  var data = this.teamCreateForm.value.players.filter(ele=>ele.active)

    // //  if(data.length > 3){
    // //   console.log("==>",data.length )
    // //   return this.object.getDOMInstance().error("Only 4 Player can active at a time")
    // //  }
    // }
    console.log(this.teamCreateForm.value)
    if (this.teamCreateForm.invalid) {
      this.teamCreateForm = ValidatorService.validationForm(this.teamCreateForm);
      return;
    }
    this.signupNewteamdata()
  }


   // Add New Team
   signupNewteamdata() {
      var url: any
      url = this.object.getURLInstance().userregisterTeam
      console.log(this.teamCreateForm.value)
      
     let data= this.teamCreateForm.value
     data.userId=this.object.getUserdetails._id

    this.object.post(url, data).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      
    }, error => {
      this.object.setError(error)

    })
  }

  closeSignupmodal() {
    this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.playersignup)
  }


}
