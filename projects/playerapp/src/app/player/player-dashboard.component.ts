import { Component, OnInit, Output, EventEmitter,  ElementRef, HostListener } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './player-dashboard.component.html',
  styleUrls: ['./player-dashboard.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(0%)',opacity: 1 }),
        animate('300ms', style({ transform: 'translateX(0%)',opacity:1}))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)',opacity: 1 }),
        animate('300ms', style({ transform: 'translateX(-90%)',opacity:0 }))
      ])
    ])
  ]
})
export class PlayerDashboard  implements OnInit {

  
  constructor( public activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {
    
  }


  @HostListener('window:resize', ['$event']) public onResize(event):void {
  //   if(this.object.themeChange.uxDesign == 'D1' || this.object.themeChange.uxDesign == 'D4'){
  //   this.toggleSlip = document.getElementsByClassName('bet-slip-container')[0]
  //   if(!this.toggleSlip){return}
  //   if(window.screen.width< 1366 || window.innerWidth <  1366){
  //     this.toggleSlip.classList.remove("rightbetopen");
  //     this.toggleSlip.classList.add("rightbetclose");
  //   }
  //   else{
  //     this.toggleSlip.classList.remove("rightbetclose");
  //     this.toggleSlip.classList.add("rightbetopen");
  //   }
  // }
  }
  

}
