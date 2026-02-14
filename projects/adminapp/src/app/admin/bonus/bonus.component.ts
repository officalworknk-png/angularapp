import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from 'core/services/index.service';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {
  bonusdata: any;
  selectedBonus:any;
submitted=false
  constructor(public object: MainObjectService, public router: Router,private fb: FormBuilder) { 
    this.object.activelink="BONUS"

  }

  ngOnInit() {

    this.getbonusData()

    this.addbonusForm()
  }
  bonusData: any=[]
  getbonusData() {
    var url: any

    if (this.object.isAdmin) {
      url = this.object.getURLInstance().admingetallBonus
      

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().admingetallBonus

    }
    else if (this.object.isUser) {
      return

    }
    this.object.get(url, null).subscribe((res:any) => {
      this.bonusData = res.data
      console.log("call=====>", this.bonusData)
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

  addbonus(){
    this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.addbonus)

  } 

  bonusForm: FormGroup = new FormGroup({
    bonusName: new FormControl(''),
    description: new FormControl(''),
    active: new FormControl(''),
    maxBonusAmount: new FormControl(''),
    validFrom: new FormControl(''),
    validTill: new FormControl(''),
    seq: new FormControl(''),
    bonusType: new FormControl(''),
    createdby: new FormControl(''),
  });
  addbonusForm() {
    this.bonusForm = this.fb.group(
      {
        bonusName: ['', Validators.required],
        description: ['',],
        active: [false, Validators.required],
        maxBonusAmount: ['', Validators.required],
        validFrom: ['', Validators.required],
        validTill: ['', Validators.required],
        seq: ['',Validators.required],
        bonusType: ['', Validators.required],
        createdby: ['', ],
      });
  }
  get f() { return this.bonusForm.controls; }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.bonusForm.value);
    if (this.bonusForm.invalid) {
        this.bonusForm = ValidatorService.validationForm(this.bonusForm);
      
      return;
    }
    this.addbonusdata()
  }


  // Add New bonus
  addbonusdata() {
    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().admincreateBonus
    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().admincreateBonus
      
    }
    let data=this.bonusForm.value
    data.createdby=this.object.getUserdetails.email

    this.object.post(url, data).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.addbonus)
      this.bonusForm.reset()
      this.getbonusData()
    }, error => {
      this.object.setError(error)

    })
  }

  updatebonus(data){
    console.log(data)
    this.selectedBonus=data
    this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.addbonus)
    this.showupdatedvalue()
  }

 



  showupdatedvalue(){
    this.bonusForm.patchValue({
      bonusName: this.selectedBonus.bonusName,
      description: this.selectedBonus.description,
      active: this.selectedBonus.active,
      maxBonusAmount:this.selectedBonus.maxBonusAmount,
      validFrom:this.object.formatDate(this.selectedBonus.validFrom),
      validTill:this.object.formatDate(this.selectedBonus.validTill),
      seq:this.selectedBonus.seq,
      createdby:this.selectedBonus.createdby,
      bonusType:this.selectedBonus.bonusType
    })
    console.log("==+++>",this.bonusForm.value)
  }

  updateSubmit(){
    if (this.bonusForm.invalid) {
      return;
    }
    var data=this.bonusForm.value

    console.log("==+++>",data,this.bonusForm.value)
    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminupdateBonus+"/"+ this.selectedBonus._id
      
    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().adminupdateBonus+"/"+ this.selectedBonus._id
      
    }

    this.object.post(url, data).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success(res.message)
      this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.addbonus)
      this.bonusForm.reset()
      this.getbonusData()
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
      this.getbonusData()
    }, error => {
      this.object.setError(error)

    })
  }

  deletebonus(data){
    
  }
}

