import { Component, OnInit } from '@angular/core';
import { MainObjectService } from 'core/services/master-object.service';

@Component({
  selector: 'app-toster',
  templateUrl: './toster.component.html',
  styleUrls: ['./toster.component.scss']
})
export class TosterComponent implements OnInit {

  constructor(public object:MainObjectService) { }

  ngOnInit() {

  }

     

}
