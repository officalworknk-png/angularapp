import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from 'core/services/index.service';
import { MainObjectService } from 'core/services/master-object.service';

// import { AuthService } from 'angularx-social-login';
// import { SocialUser } from 'angularx-social-login';
// import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loader: boolean = false;

  constructor(private fb: FormBuilder, public object: MainObjectService, public router: Router) { 
  }

  profileForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  ngOnInit(): void {
    this.profileForm = this.fb.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
   

      if(this.object.isLogin){
        this.router.navigate(['admin/home'])
      }
  }


  get f() { return this.profileForm.controls; }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    if (this.profileForm.invalid) {
      this.profileForm = ValidatorService.validationForm(this.profileForm);
      
      return;
    }
    this.loader = true
    console.warn(this.profileForm.value);
    this.loginUserdata()
  }




  loginUserdata() {
    console.log("call=====>", this.profileForm.value)
    let url =  this.object.getURLInstance().adminlogin
   
    this.object.post(url, this.profileForm.value).subscribe(res => {
      console.log("call===asdsa==>", res)
      this.loader = false
      localStorage.setItem("token", (res.token))
      this.object.getDOMInstance().success('Login Succesfully')
      this.router.navigate(['admin/home'])
      this.object.parseToken()
    }, error => {
      this.loader = false
      this.object.setError(error)

    })
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
