import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
    selectedannouncement: any;
submitted=false
  
    constructor(public object: MainObjectService, public router: Router,private fb: FormBuilder) { 
      this.object.activelink="ANNOUNCEMENT"
  
    }
  
    ngOnInit() {
  
      this.getannouncementData()
  
      this.addannouncementForm()
    }
    getannounceList: any=[]
    getannouncementData() {
      var url: any
  
      if (this.object.isAdmin) {
        url = this.object.getURLInstance().getannouncement
        
  
      }
      else if (this.object.isOwner) {
        url = this.object.getURLInstance().getannouncement
  
      }
      else if (this.object.isUser) {
        return
  
      }
      this.object.get(url, null).subscribe((res:any) => {
        this.getannounceList = res.data
        console.log("call=====>", this.getannounceList)
      }, error => {
        this.object.setError(error)
  
      })
      // get data with pagination
      let obj = {
        pageNo: 2,
        size: 5,
  
      }
    
    }
  
    addannouncement(){
      this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.addannouncement)
  
    } 
  
    announcementForm: FormGroup = new FormGroup({
      announcement: new FormControl(''),
      idx: new FormControl(''),
      status: new FormControl(''),
    });
    addannouncementForm() {
      this.announcementForm = this.fb.group(
        {
          announcement: ['', Validators.required],
          idx: ['',],
          status: ['INACTIVE', Validators.required],
         
        });
    }
    get f() { return this.announcementForm.controls; }
    onSubmitAnnouncemnt() {
      // TODO: Use EventEmitter with form value
      console.warn(this.announcementForm.value);
      if (this.announcementForm.invalid) {
        return;
      }
      this.addannouncementdata()
    }
  
  
    // Add New addannouncement
    addannouncementdata() {
      var url: any
      if (this.object.isAdmin) {
        url = this.object.getURLInstance().createannouncement
      }
      else if (this.object.isOwner) {
        url = this.object.getURLInstance().createannouncement
        
      }
      let data=this.announcementForm.value
      data.createdby=this.object.getUserdetails.email
  
      this.object.post(url, data).subscribe(res => {
        console.log("ann submit=====>", res)
        this.object.getDOMInstance().success(res.message)
        this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.addannouncement)
        this.announcementForm.reset()
        this.getannouncementData()
      }, error => {
        this.object.setError(error)
  
      })
    }
  
    updateannouncementdata(data){
      console.log(data)
      this.selectedannouncement=data
      this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.addannouncement)
      this.showupdatedvalue()
    }
  
   
  
  
  
    showupdatedvalue(){
      this.announcementForm.patchValue({
        idx:this.selectedannouncement.idx,
        announcement:this.selectedannouncement.announcement,
        status:this.selectedannouncement.status
      })
      console.log("==+++>",this.announcementForm.value)
    }
  
    updateSubmit(){
      if (this.announcementForm.invalid) {
        return;
      }
      var data=this.announcementForm.value
  
      console.log("==+++>",data,this.announcementForm.value)
      var url: any
      if (this.object.isAdmin) {
        url = this.object.getURLInstance().updateannouncement+"/"+ this.selectedannouncement._id
        
      }
      else if (this.object.isOwner) {
        url = this.object.getURLInstance().updateannouncement+"/"+ this.selectedannouncement._id
        
      }
  
      this.object.post(url, data).subscribe(res => {
        console.log("call=====>", res)
        this.object.getDOMInstance().success(res.message)
        this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.addannouncement)
        this.announcementForm.reset()
        this.getannouncementData()
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
        this.getannouncementData()
      }, error => {
        this.object.setError(error)
  
      })
    }

    deletebonus(data){

    }
  
  

}
