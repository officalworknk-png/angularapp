import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {
submitted = false;
  userId:boolean=false
  constructor(public object: MainObjectService, public router: Router,private fb: FormBuilder) { }


  ngOnInit() {
    this.object.getselfAccount()
    setTimeout(() => {
      
      this.adduserForm()
    }, 200);
  }
  profileForm: FormGroup = new FormGroup({
    number: new FormControl(''),
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
  });
  adduserForm() {
    this.profileForm = this.fb.group(
      {
        name: ['', Validators.required],
        number: ['', Validators.required],
        email: ['',],
        password: ['',],
      });



      this.showupdatedvalue()
  }
  get f() { return this.profileForm.controls; }



 



  showupdatedvalue(){
    console.log("==+++>",this.object.getUserdetails)

    this.profileForm.patchValue({
      email: this.object.getUserdetails.email,
      number:  this.object.getUserdetails.number,
      name:  this.object.getUserdetails.name,
    })
  }

  updateSubmit(){

    console.log("==+++>",this.profileForm.value)

    if (this.profileForm.invalid) {
      return;
    }
    var data=this.profileForm.value
    console.log("==+++>",data,this.profileForm.value)
     var  url = this.object.getURLInstance().userchangepassword+"/"+  this.object.getUserdetails._id
    this.object.post(url, data).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.object.getselfAccount()
    }, error => {
      this.object.setError(error)

    })
  }

}
