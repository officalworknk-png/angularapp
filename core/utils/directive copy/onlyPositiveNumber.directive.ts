import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Description:Class used make directive for only positve number
 */
@Directive({
  selector: '[positiveNumberOnly]'
})
export class PositiveNumberOnly {

  constructor(private _el: ElementRef) { }

  /**
   * @param {any} event 
   * @description
   * This function used to press only positive number value from keyboard 
   */
  @HostListener('keypress', ['$event']) onInputChange(event:any) {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}