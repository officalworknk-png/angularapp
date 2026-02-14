import { Component } from '@angular/core';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  constructor( public object: MainObjectService) {

   var token= localStorage.getItem("token")
   if(token){
    this.object.parseToken()
   }
   }

}
