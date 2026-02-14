import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from 'core/services/index.service';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-user-downline',
  templateUrl: './user-downline.component.html',
  styleUrls: ['./user-downline.component.scss']
})
export class UserDownlineComponent implements OnInit {

  userId: any;
  userdetail: any;
  selectedUser: any;

  constructor(public object: MainObjectService, public router: Router,private fb: FormBuilder) {
    this.object.activelink="DOWNLINE"
    
  }

  ngOnInit() {
    this.getUserdata()

    this.adduserForm()
  }
  userdata: any
  getUserdata() {
    var url: any

    if (this.object.isAdmin) {
      url = this.object.getURLInstance().admingetallUser
      

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().ownergetallUser

    }
    else if (this.object.isUser) {
      return

    }
    console.log("ROLE ADMIN==>", this.object.isAdmin)
    console.log("ROLE OWNER==>", this.object.isOwner)
    console.log("ROLE User==>", this.object.isUser)

    this.object.get(url, null).subscribe((res:any) => {
      console.log("call=====>", res)
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
    phoneNumber: new FormControl(''),
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
        username:[''],
        phoneNumber: ['', Validators.required],
        email: ['',Validators.required],
        password: ['', Validators.required],
        role: ['PLAYER', Validators.required],
        roleAlias: ['PL', Validators.required],
        token: ['',],
        active: ['INACTIVE', Validators.required],

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
    this.getUserdata()
    this.adduserForm()
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
      phoneNumber: this.selectedUser.phoneNumber,
      email: this.selectedUser.email,
      password: "",
      role: this.selectedUser.role,
    })

    console.log("==+++>",this.profileForm.value)
  }

  updateSubmit(){
    if (this.object.isAdmin) {
      this.profileForm.get('password').clearValidators();
      this.profileForm.get('password').updateValueAndValidity();
    }
    console.log("updateSubmit==+++>",this.profileForm.value)

    if (this.profileForm.invalid) {
      this.profileForm = ValidatorService.validationForm(this.profileForm);
      return;
    }
    var data=this.profileForm.value
    delete data.token
    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminupdateUser+"/"+ this.selectedUser._id
    
      delete data.password
      
    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().ownerupdateUser+"/"+ this.selectedUser._id
      
    }

    this.object.post(url, data).subscribe(res => {
      this.object.getDOMInstance().success(res.message)
      this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.adduser)

      this.getUserdata()
      this.adduserForm()
    

    }, error => {
      this.object.setError(error)

    })
  }



  deleteUser(data) {
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
