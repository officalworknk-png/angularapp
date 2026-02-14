import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from 'core/services/index.service';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-player-login',
  templateUrl: './player-login.component.html',
  styleUrls: ['./player-login.component.scss']
})
export class PlayerLoginComponent implements OnInit {

  loader: boolean = false;

  constructor(private fb: FormBuilder, public object: MainObjectService, public router: Router) { 
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
   
  }


  get f() { return this.loginForm.controls; }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.loginForm.invalid) {
      this.loginForm = ValidatorService.validationForm(this.loginForm);

      return;
    }
    this.loader = true
    this.loginUserdata()
  }




  loginUserdata() {
    console.log("call=====>", this.loginForm.value)
    let url =  this.object.getURLInstance().login
   
    this.object.post(url, this.loginForm.value).subscribe(res => {
      this.loader = false
      localStorage.setItem("token", (res.token))
      this.object.getDOMInstance().success('Login Succesfully')
      this.router.navigate(['/'])
      this.object.parseToken()
      this.object.getselfAccount()
      this.closeloginmodal()
    }, error => {
      this.loader = false
      this.object.setError(error)
    })
  }

  closeloginmodal() {
    this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.playerlogin)
  }

  // getAccessToken(): void {
  //   this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  // }

  // getGoogleCalendarData(): void {
  //   if (!this.accessToken) return;

  //   this.httpClient
  //     .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
  //       headers: { Authorization: `Bearer ${this.accessToken}` },
  //     })
  //     .subscribe((events) => {
  //       alert('Look at your console');
  //       console.log('events', events);
  //     });
  // }

  // signInWithFB(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  // signOut(): void {
  //   this.socialAuthService.signOut();
  // }

  // refreshToken(): void {
  //   this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }


  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x));
  // }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
  // }

 

  // signOut(): void {
  //   this.authService.signOut();
  // }
}
