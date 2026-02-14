import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss']
})
export class BankingComponent implements OnInit {

  userId: any;
  userdetail: any;
  selectedUser: any;
  orignalUserdata: any;
  messageresponse: any;

  constructor(public object: MainObjectService, public router: Router,private fb: FormBuilder) { 
    this.object.activelink="BANKING"

  }

  ngOnInit() {
    
    this.getUserBankingdata()

  }
  userdata: any
  getUserBankingdata() {
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
    

    this.object.get(url, null).subscribe((res:any) => {
    res.data.map(ele=>{
        ele.isDeposite=false
        ele.isWidthraw=false
        ele.bankingOption=null
      })
      
      this.orignalUserdata = [...res.data]
      this.userdata = res.data
      console.log("GET banking=====>", this.userdata)
    }, error => {
      this.object.setError(error)

    })


  
  }

  searchUser(){
    this.userdata
  }


    /**
     * @param child : ChildUser Object.
     * @param index : ChildUser Index.
     * @param userId : ChildUSerId.
     * @description
     * Click on Deposite (D) button on banking.
     */
     isDepositesection(i) {

      // var index = this.userdata.findIndex(x => x._id == child._id)
       console.log(this.userdata[i].isDeposite)
  
       this.userdata[i].isDeposite=  this.userdata[i].isDeposite ? false :true

       if (this.userdata[i].isDeposite) {
        this.userdata[i].isWidthraw=false
      } else {
        this.userdata[i].bankingOption = null;
        this.userdata[i].userBalance = null;
      }

  }

    /**
     * @param child : ChildUser Object.
     * @param index : ChildUser Index.
     * @param userId : ChildUSerId.
     * @description
     * Click on Deposite (D) button on banking.
     */
     isWidthrawsection(i) {

      // var index = this.userdata.findIndex(x => x._id == child._id)
       console.log(this.userdata,i)
  
       this.userdata[i].isWidthraw=  this.userdata[i].isWidthraw ? false :true
        if (this.userdata[i].isWidthraw) {
            this.userdata[i].isDeposite=false
          } else {
            this.userdata[i].bankingOption = null;
            this.userdata[i].userBalance = null;
          }

  }

  submitbankingDetail(){
    var obj=[]
    console.log("Banking===",this.userdata)
    this.userdata.map(ele=>{
      if((ele.isDeposite || ele.isWidthraw) && ele.amount){
        obj.push({...ele,parentName:this.object.getUserdetails.name,parentId:this.object.getUserdetails._id})
      }
    })
    // console.log("Updated Banking===",obj)
    if(obj.length==0){
      this.object.getDOMInstance().error("Please select one user atleast for Banking")
      return
    }

    var url: any
    if (this.object.isAdmin) {
      url = this.object.getURLInstance().adminBanking 

    }
    else if (this.object.isOwner) {
      url = this.object.getURLInstance().adminBanking 
    }

    // return obj
    this.object.post(url, obj).subscribe(res => {
      console.log("call=====>", res)
      this.messageresponse=res.body
      this.getUserBankingdata()
      setTimeout(() => {
        this.messageresponse=[]
      }, 25000);
      this.object.getDOMInstance().success( res.message)
    }, error => {
      this.object.setError(error)

    })

  }

  clearbankingDetail(){

    this.orignalUserdata= this.orignalUserdata.map(v => ({
      ...v, isDeposite: false, isWidthraw: false, bankingOption: null, userBalance: null,remark:null

  }))
      this.userdata=this.orignalUserdata
    console.log("==>",this.userdata,this.orignalUserdata)

  }



  refreshbankingDetail(){
    this.getUserBankingdata()
    this.createLogDb()
  }

  createLogDb(){
    return
   var url = this.object.getURLInstance().adminUpdateInfoBanking 
  var  obj=this.userdata
  
    this.object.post(url, obj).subscribe(res => {
      console.log("call=====>", res)
      this.object.getDOMInstance().success( res.message)
    }, error => {
      this.object.setError(error)

    })
  }
}
