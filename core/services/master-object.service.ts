import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DOM_UTIL } from '../utils/dom-util';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { URL, UI_URL } from '../utils/api-routes';
// import { LoginModel } from 'core/modal/login.model';

@Injectable({
  providedIn: 'root'
})
export class MainObjectService {
  
  baseURL="http://localhost:3000"
  getUserdetails: any;
  activelink:any
  // public loginState: LoginModel,
    constructor(public  http: HttpClient,public router:Router, ) { }


  isUser:boolean=false
  isAdmin:boolean=false
  isOwner:boolean=false
  isLogin:boolean=false


  getselfAccount() {
    var url: any
    if (this.isOwner) {
      url =  this.getURLInstance().ownergetselfAccount

    }
    else if (this.isAdmin) {
      url =  this.getURLInstance().admingetselfAccount
     
    }
    else if (this.isUser) {
      url =  this.getURLInstance().usergetselfAccount

    }

    if(!this.isLogin){return}

    this.get(url, null).subscribe((res:any) => {
      this.getUserdetails=res.data
      localStorage.setItem("userdata",JSON.stringify(this.getUserdetails))
      console.log("getUserdetails=====>",  this.getUserdetails)
    }, error => {
      this.setError(error)

    })
  }

  getDOMInstance() {
    return DOM_UTIL
  }

  getUI_URL() {
    return UI_URL;
  }

  getRouterInstance() {

    return this.router;
  }
  // getLoginInstance() {
  //   return this.loginState;
  // }

  /**
   * @description 
   * This method returns the URL  instance to access the API Urls.
   * 
   * Getter Method.
   */
   getURLInstance() {
    return URL;
  }

  setError(error){
    console.log(error)
    if(error.status==0){
      this.getDOMInstance().error("Server not avialible")
    }
    else if(error.status==400 ){
    console.log("EEEEEEEEEEEEEEEEEEEE")
      this.getDOMInstance().error(error.error.message)
    }
    else if( error.status==401 ){
      this.getDOMInstance().error(error.error.message)
      localStorage.clear();
      this.router.navigate(['/'])

    }
    else if( error.status==403 ){
      this.getDOMInstance().error(error.error.message)
      // localStorage.clear();
      // this.router.navigate(['/'])

    }
    else if(error.status==501 || error.status==500){
      this.getDOMInstance().error(error.error.message)

    }

  }


  get(apiname, param: string) {
    let _headers = {
      'Content-Type': 'application/json',
      // "Access-Control-Allow-Headers":" Origin, Content-Type, Accept",
      // 'x-timeZone': this.timeZoneName,
      'x-access-token': this.getToken(),
    }
    var headerObj = {
      headers: new HttpHeaders(_headers),
    };
    // console.log(this.baseURL +apiname+ "?"+ param)
    return this.http.get(this.baseURL +apiname+ "?"+ param,headerObj)
    // .pipe(map((res: Response) => res.json()))
    
    // console.log(value)

  }

  post(apiname,obj): Observable<any> {
    let _headers = {
      'Content-Type': 'application/json',
      // 'x-timeZone': this.timeZoneName,
      'x-access-token': this.getToken(),
    }
    var headerObj = {
      headers: new HttpHeaders(_headers),
    }; 
    const body=JSON.stringify(obj);
    return this.http.post(this.baseURL +apiname, body,headerObj)
    // .pipe(map((res: Response) => res.json()));
  }

  delete(apiname,param: string): Observable<any> {
    let _headers = {
      'Content-Type': 'application/json',
      // 'x-timeZone': this.timeZoneName,
      'x-access-token': this.getToken()
    }
    var headerObj = {
      headers: new HttpHeaders(_headers),
    }; 
    return this.http.delete(this.baseURL +apiname+"/"+param,headerObj)
    // .pipe(map((res: Response) => res.json()));
  }

  
  getToken(){
   return localStorage.getItem("token") ? (localStorage.getItem("token")):""

  }

  parseToken(){
   var token= localStorage.getItem("token") ? (localStorage.getItem("token")):""

   if(token){
    var tokendecode:any
    tokendecode=(jwt_decode(token))
   this.getUserRole(tokendecode.role)
   }
   this.getLoginUser()
  }

  getLoginUser(){
    var token= localStorage.getItem("token") ? (localStorage.getItem("token")):""
    if(token){
      this.isLogin=true
    }
    else{
      this.isLogin=false

    }
  }

  getUserRole(role){

    if(role=="ADMIN"){
      this.isAdmin=true
    }
    else if(role=="OWNER"){
      this.isOwner=true

    }
    else if(role=="PLAYER"){
      this.isUser=true

    }

  }


  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

}
