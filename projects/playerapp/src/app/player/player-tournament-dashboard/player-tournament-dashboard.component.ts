import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-player-tournament-dashboard',
  templateUrl: './player-tournament-dashboard.component.html',
  styleUrls: ['./player-tournament-dashboard.component.scss']
})
export class PlayerTournamentDashboardComponent implements OnInit {

  tournamentdata: any;
  selectedTournamntData: any
  constructor(private fb: FormBuilder, public object: MainObjectService, public routeParam: ActivatedRoute,public router: Router) {

  }


  ngOnInit() {
    this.gettournamentdata()

  }

  gettournamentdata() {
    var url: any

      url = this.object.getURLInstance().usergetallTournament

    this.object.get(url, null).subscribe((res: any) => {
      console.log("call=====>", res)
      this.tournamentdata = res.data
    }, error => {
      this.object.setError(error)

    })

  }

  openmodaladdtournament() {
    this.selectedTournamntData = null
    console.log(this.selectedTournamntData)
    this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.addtournament)
  }

  tournamentForm: FormGroup = new FormGroup({
    tunmntname: new FormControl(''),
    maxParticipentTeam: new FormControl(''),
    status: new FormControl(''),
    gameType: new FormControl(''),
    eventCategory: new FormControl(''),



  });
  addtournament() {
    this.tournamentForm = this.fb.group(
      {
        tunmntname: ['', Validators.required],
        maxParticipentTeam: ['', Validators.required],
        status: ['INACTIVE', Validators.required],
        gameType: ['PUBG', Validators.required],
        eventCategory: ['TOURNAMENT', Validators.required]

      });

  }


  onAddtournament() {
    console.log("==>", this.tournamentForm.value)
    if (this.tournamentForm.invalid) {
      return;
    }
    this.addTournamentdata()
  }

  addTournamentdata() {
    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminaddnewTournament

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().adminaddnewTournament
    }
    console.log(this.tournamentForm.value)

    let tournament = this.tournamentForm.value
    tournament.eventCategory = "TOURNAMENT"

    console.log(tournament)
    this.object.post(url, tournament).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.addtournament)

      this.gettournamentdata()


    }, error => {
      this.object.setError(error)

    })
  }

  showUpdatedTournamentModal(data) {
    this.selectedTournamntData = data
    this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.addtournament)
    this.showUpdatedTournament()
  }
  showUpdatedTournament() {
    console.log(this.selectedTournamntData, this.tournamentdata)
    this.tournamentForm.patchValue({
      tunmntname: this.selectedTournamntData.tunmntname,
      maxParticipentTeam: this.selectedTournamntData.maxParticipentTeam,
      status: this.selectedTournamntData.status,
      gameType: this.selectedTournamntData.gameType,
    })
  }

  updatetounament(userId) {

    if (this.tournamentForm.invalid) {
      return;
    }
    var data = this.tournamentForm.value


    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminupdateTournament + "/" + this.selectedTournamntData._id

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().adminupdateTournament + "/" + this.selectedTournamntData._id
    }
    console.log("==+++>", data, this.tournamentForm.value)

    this.object.post(url, data).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.addtournament)

      this.gettournamentdata()


    }, error => {
      this.object.setError(error)

    })
  }

  deleteTournamet(data) {
    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().admindeleteTournament

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().ownerdeleteuser

    }
    this.object.delete(url, data._id).subscribe(res => {
      // console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.gettournamentdata()

    }, error => {
      this.object.setError(error)

    })

  }

  viewTournamet(data){
    this.router.navigate(['tournamentdata/'+data._id])

  }


}

