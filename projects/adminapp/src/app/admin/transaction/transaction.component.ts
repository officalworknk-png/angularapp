import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transationData=[];
  getUserData: any;
  status: string = 'COMPLETED';  // Default value
  remark: string = '';          // Default empty remark
 constructor(public object: MainObjectService, public router: Router,private fb: FormBuilder) { 
    this.object.activelink="BONUS"

  }
  ngOnInit() {
    this.gettransationData()
  }


  gettransationData() {
    var url: any

    if (this.object.isAdmin) {
      url = this.object.getURLInstance().admingetwalletTransactionStatus
      

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().admingetwalletTransactionStatus

    }
    else if (this.object.isUser) {
      return

    }
    this.object.get(url, null).subscribe((res:any) => {
      this.transationData = res.data
      console.log("call=====>", this.transationData)
    }, error => {
      this.object.setError(error)

    })
 
  }

  updatemodal(data){
    this.getUserData=data
    this.object.getDOMInstance().showModal(this.object.getDOMInstance().modal.updatetransation)

  }


  updateStatusbanking(){
    
    console.log('Selected Status:', this.status);
    console.log('Entered Remark:', this.remark);

    console.log("Banking===",this.getUserData)
    var obj=this.getUserData
    obj.status=this.status
    obj.remark=this.remark
    
    if (obj.status =='PENDING') {
      this.object.getDOMInstance().error('Pending transation not sent')
    }
    
    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminwalletTransactionStatus 

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().adminwalletTransactionStatus 
    }

    this.object.post(url, obj).subscribe(res => {
      console.log("call=====>", res)
    this.gettransationData()
    this.object.getDOMInstance().hideModal(this.object.getDOMInstance().modal.updatetransation)
      this.object.getDOMInstance().success( res.message)
    }, error => {
      this.object.setError(error)

    })

  }
}
