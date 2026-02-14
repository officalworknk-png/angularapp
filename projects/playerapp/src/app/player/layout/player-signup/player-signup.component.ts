import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from 'core/services/index.service';
import { MainObjectService } from 'core/services/master-object.service';


@Component({
  selector: 'app-player-signup',
  templateUrl: './player-signup.component.html',
  styleUrls: ['./player-signup.component.scss']
})
export class PlayerSignupComponent implements OnInit {
submitted = false;
userId: any;
  constructor(private fb: FormBuilder, public object: MainObjectService, public routeParam: ActivatedRoute,public router: Router) {
  }

  playerSignupForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    number: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    refCode: new FormControl(''),
    token: new FormControl('')

  });
  ngOnInit() {

    this.playerSignupForm = this.fb.group(
      {
        name: ['', Validators.required],
        number: ['', Validators.required],
        email: ['',Validators.required],
        password: ['', Validators.required],
        refCode: ['',],
        token: ['',],

      });

  }

  get f() { return this.playerSignupForm.controls; }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.playerSignupForm.invalid) {
      this.playerSignupForm = ValidatorService.validationForm(this.playerSignupForm);

      return;
    }
    this.signupUserdata()
    console.log(this.playerSignupForm.value)
  }


   // Add New User
   signupUserdata() {
      var url: any
      url = this.object.getURLInstance().usersignup
      
    let userdata= this.playerSignupForm.value
    userdata.role="PLAYER"

    if(!userdata.refCode){
      userdata.parentRole="DEFAULT_ADMIN"
    }

    this.object.post(url, userdata).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.closeSignupmodal()
    }, error => {
      this.object.setError(error)

    })
  }

  closeSignupmodal() {
    this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.playersignup)
  }
}
