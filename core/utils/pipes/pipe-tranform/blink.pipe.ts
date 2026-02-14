import { Pipe, PipeTransform } from '@angular/core';
import { MasterObjectService } from '../../../services/index.service';


/**
 * Discription  pipe use for blink back lay box when rate changes
 */
@Pipe({name: 'blinker'})
export class BLINK implements PipeTransform {
  constructor(public object: MasterObjectService) {
  }

  /**
   * @param {any} num 
   * @param {any} term
   * @description 
   * Funtion used for add class to blink back/lay box when rate changes
   * 
   */
  transform(num: any, term: any): any {
    //  && this.object.themeChange.uxDesign != 'D1'
    // if (this.object.themeChange.uxDesign != 'D2' && this.object.themeChange.uxDesign != 'D1' && this.object.themeChange.uxDesign != 'D3' && this.object.themeChange.uxDesign != 'D4') { return num }
 
    let scroll

    // if(isNaN(num) || num == null){return num;}
    // num = parseFloat(num);
    // num=Math.abs(Math.round(num))

    scroll = document.getElementsByClassName(num)[0]
    if (term.status != 'OPEN' || term.suspended || num=='-') {
      return num;
    }
   
    if (term.type == 'back') {
      scroll.classList.add("blinkBack");
      setTimeout(() => {
        scroll.classList.remove("blinkBack");
      }, 200);
    }
    else if (term.type == 'lay') {
      scroll.classList.add("blinkLay");
      setTimeout(() => {
        scroll.classList.remove("blinkLay");
      }, 200);
    }
    else if (term.type == 'oddsup') { // for d3
      scroll.classList.add("odds-up");
      setTimeout(() => {
        scroll.classList.remove("odds-up");
      }, 400);
    }
    else if (term.type == 'oddsdown') { // for d3
      scroll.classList.add("odds-down");
      setTimeout(() => {
        scroll.classList.remove("odds-down");
      }, 400);
    }
    else if (term.type == 'spark') { // for d4
      scroll.classList.add("spark");
      setTimeout(() => {
        scroll.classList.remove("spark");
      }, 200);
    }
    else if (term.type == 'blink') { // for d5
      scroll.classList.add("blink");
      setTimeout(() => {
        scroll.classList.remove("blink");
      }, 200);
    }
    else if (term.type == 'changed') { // for d6
      // if(num>11){scroll.classList.add("disclick");} //disable click on odd when odd greter then 11
      // else{scroll.classList.remove("disclick");}

      scroll.classList.add("changed");
      setTimeout(() => {
        scroll.classList.remove("changed");
      }, 200);
    }
    else if (term.type == 'changed2') { // for d6 mobile
      // if(num>11){scroll.classList.add("disclick");} //disable click on odd when odd greter then 11
      // else{scroll.classList.remove("disclick");}

      scroll.classList.add("-apl-highlighted");
      setTimeout(() => {
        scroll.classList.remove("-apl-highlighted");
      }, 200);
    }
    else if (term.type == 'd9-back') {
      if(!num){return num}

      scroll.classList.add("odd_updated");
      setTimeout(() => {
        scroll.classList.remove("odd_updated");
      }, 500);
    }
    else if (term.type == 'd9-lay') {
      if(!num){return num}

      scroll.classList.add("odd_updated");
      setTimeout(() => {
        scroll.classList.remove("odd_updated");
      }, 500);
    }
    else if (term.type == 'd9-lay-differ') {
      if(!num){return num}
      scroll = document.getElementsByClassName(num+'differ')[0]
      scroll.classList.add("odd_updated");
      setTimeout(() => {
        scroll.classList.remove("odd_updated");
      }, 500);
    }
    return num
  }

}