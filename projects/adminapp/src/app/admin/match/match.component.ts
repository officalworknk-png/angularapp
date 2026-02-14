import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Input() tournamentdata:any
  matchdata: any;
  selectedMatchData: any
  constructor(private fb: FormBuilder, public object: MainObjectService, public routeParam: ActivatedRoute,public router: Router) {

  }


  ngOnInit() {
    // setInterval(()=>{
    //   console.log(this.tournamentdata._id
    //     )
    // },5000)
    this.getmatchdata()

  }

  getmatchdata() {
    var url: any

    if (this.object.isAdmin) {
      url = this.object.getURLInstance().admingetallMatch

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().admingetallMatch


    }
    else if (this.object.isUser) {
      return

    }

    this.object.get(url, null).subscribe((res: any) => {
      this.matchdata = res.data
      console.log("+++++++++++++++++++++++++=====>",  this.matchdata)
    }, error => {
      this.object.setError(error)

    })

  }

  openmodaladdmatch() {
    this.selectedMatchData = null
    console.log(this.selectedMatchData)
    this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.addmatch)
  }

  matchForm: FormGroup = new FormGroup({
    round: new FormControl(''),
    matchNo: new FormControl(''),
    status: new FormControl(''),
    bye: new FormControl(''),   //team automatically advancing to the next round of tournament 
    // player1: new FormControl(''),
    // player2:new FormControl(''),
    path:new FormControl(''),
    tournamentId:new FormControl(''),


  });
  addmatch() {
    this.matchForm = this.fb.group(
      {
        round: ['', Validators.required],
        matchNo: ['', Validators.required],
        status: ['INACTIVE', Validators.required],
        bye: ['false', Validators.required],
        tournamentId: [' ', Validators.required],
        teamsPerMatch:['', Validators.required],
        // player1: ['match', Validators.required],
        // player2: ['match', Validators.required],
        // path: ['match', Validators.required]

      });

  }


  onAddmatch() {
    console.log("==>", this.matchForm.value,this.tournamentdata)
    if (this.matchForm.invalid) {
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

    match.tournamentId=
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

  showUpdatedmatchModal(data) {
    this.selectedMatchData = data
    this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.addmatch)
    this.showUpdatedmatch()
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
    var data = this.matchForm.value


    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminupdateMatch + "/" + this.selectedMatchData._id

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().adminupdateMatch + "/" + this.selectedMatchData._id
    }
    console.log("==+++>", data, this.matchForm.value)

    this.object.post(url, data).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.addmatch)

      this.getmatchdata()


    }, error => {
      this.object.setError(error)

    })
  }

  deleteTournamet(data) {
    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().admindeleteMatch

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().ownerdeleteuser

    }
    this.object.delete(url, data._id).subscribe(res => {
      // console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.getmatchdata()

    }, error => {
      this.object.setError(error)

    })

  }

  viewTournamet(data){
    this.router.navigate(['admin/updatetrnmnt/'+data._id])

  }


}

