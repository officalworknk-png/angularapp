import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-player-banking',
  templateUrl: './player-banking.component.html',
  styleUrls: ['./player-banking.component.scss']
})
export class PlayerBankingComponent implements OnInit {

   constructor(public object: MainObjectService, public router: Router,private fb: FormBuilder) { }
  
   depositForm: FormGroup = new FormGroup({
    amount: new FormControl(''),
    bnkHolderName: new FormControl(''),
    transactionNumber: new FormControl(''),

  });

  withdrawForm: FormGroup = new FormGroup({
    amount: new FormControl(''),
    bnkHolderName: new FormControl(''),
    accNumber: new FormControl(''),
    bnkName: new FormControl(''),
    ifscCode: new FormControl(''),
  });
  
    ngOnInit() {
     this.transactionForm()
    } 

    transactionForm() {
      this.depositForm = this.fb.group(
        {
          amount: ['', Validators.required],
          bnkHolderName: ['', Validators.required],
          transactionNumber: ['',],
        });

        this.withdrawForm = this.fb.group(
          {
            amount: ['', Validators.required],
            bnkHolderName: ['', Validators.required],
            accNumber: ['',Validators.required],
            bnkName: ['',Validators.required],
            ifscCode: ['',Validators.required],
          });
    }
  
    submitDeposit(){
      console.log("==+++>",this.depositForm.value)
  
      if (this.depositForm.invalid) {
        return;
      }
      var data=this.depositForm.value
      console.log("==+++>",data,this.depositForm.value)
       var  url = this.object.getURLInstance().userwalletdepositTransaction
      this.object.post(url, data).subscribe(res => {
        console.log("call=====>", res)
        this.object.getDOMInstance().success(res.message)
        this.object.getselfAccount()
      }, error => {
        this.object.setError(error)
  
      })
    }



    submitWithdrawal(){
      console.log("==+++>",this.depositForm.value)
  
      if (this.withdrawForm.invalid) {
        return;
      }
      var data=this.withdrawForm.value
      console.log("==+++>",data,this.withdrawForm.value)
       var  url = this.object.getURLInstance().userwalletWithdrawTransaction
      this.object.post(url, data).subscribe(res => {
        console.log("call=====>", res)
        this.object.getDOMInstance().success(res.message)
        this.object.getselfAccount()
      }, error => {
        this.object.setError(error)
  
      })
    }
  
  }
  

