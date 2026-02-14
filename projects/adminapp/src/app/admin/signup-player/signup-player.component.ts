import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from 'core/services/index.service';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-signup-player',
  templateUrl: './signup-player.component.html',
  styleUrls: ['./signup-player.component.scss']
})
export class SignupPlayerComponent implements OnInit {

  userId: any;
  userdetail: any;
  selectedUser: any;
submitted=false
  constructor(public object: MainObjectService, public router: Router,private fb: FormBuilder) {
    this.object.activelink="SIGNUP_PLAYER"
    
  }

  ngOnInit() {
    this.getUserdata()

    this.adduserForm()
  }
  userdata: any
  getUserdata() {
    var url: any

    if (this.object.isAdmin) {
      url = this.object.getURLInstance().admingetallRegisterTeam
      

    }
    else if (this.object.isOwner) {
      return

      url = this.object.getURLInstance().ownergetallUser

    }
    else if (this.object.isUser) {
      return

    }


    this.object.get(url, null).subscribe((res:any) => {
      console.log("admingetallRegisterTeam=====>", res)
      this.userdata = res.data
    }, error => {
      this.object.setError(error)

    })

    // get data with pagination
    let obj = {
      pageNo: 2,
      size: 5,

    }
    // this.object.post(url,obj).subscribe(res=>{
    //   console.log("call=====>",res)

    // },error => {
    // })
  }








  addUser(){
    this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.adduser)

  }

  profileForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    number: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
    token: new FormControl(''),
    active: new FormControl(''),


  });
  adduserForm() {
    this.profileForm = this.fb.group(
      {
        name: ['', Validators.required],
        number: ['', Validators.required],
        email: ['',],
        password: ['', Validators.required],
        role: ['USER', Validators.required],
        token: ['',],
        active: ['', Validators.required],

      });




  }
  get f() { return this.profileForm.controls; }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.profileForm.invalid) {
      this.profileForm = ValidatorService.validationForm(this.profileForm);
      
      return;
    }
    this.AddUserdata()
    console.warn(this.profileForm.value);
  }


  // Add New User
  AddUserdata() {
    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminaddnewUser
    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().owneraddnewUser
      
    }
    let data=this.profileForm.value
    data.parentRole="OWNER"

    this.object.post(url, data).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
    this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.adduser)
      
    }, error => {
      this.object.setError(error)

    })
  }

  updateUser(data){
    console.log(data)
    this.selectedUser=data
    this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.adduser)
    this.showupdatedvalue()
  }

 



  showupdatedvalue(){
    this.profileForm.patchValue({
      name: this.selectedUser.name,
      number: this.selectedUser.number,
      email: this.selectedUser.email,
      password: "N/A",
      role: this.selectedUser.role,
    })

    console.log("==+++>",this.profileForm.value)
  }

  updateSubmit(){
    if (this.profileForm.invalid) {
      return;
    }
    var data=this.profileForm.value
    delete data.password
    delete data.token
    console.log("==+++>",data,this.profileForm.value)
    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminupdateUser+"/"+ this.selectedUser._id
      
    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().ownerupdateUser+"/"+ this.selectedUser._id
      
    }

    this.object.post(url, data).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.adduser)


    }, error => {
      this.object.setError(error)

    })
  }



  deleteUser(data) {
    console.log("call=====>", data)
    var url: any
    if (this.object.isAdmin) {
      url =  this.object.getURLInstance().admindeleteuser
     
    }
    else if (this.object.isOwner) {
      url =  this.object.getURLInstance().ownerdeleteuser

    }
    this.object.delete(url, data._id).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.getUserdata()
    }, error => {
      this.object.setError(error)

    })
  }

  viewUser(data){
    this.router.navigate(['admin/userInfo/'+data._id])
  }
}
