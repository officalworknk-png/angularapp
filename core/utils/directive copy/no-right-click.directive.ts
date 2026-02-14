import { Directive, HostListener } from '@angular/core';

/**
 * Description:Directive used for prevent mouse right click
 */
@Directive({
  selector: '[noRightClick]'
})
export class NoRightClickDirective {

  /**
   * @param {any} event 
   * @description
   * Funtion used for prevent mouse right click 
   */
  @HostListener('contextmenu', ['$event'])
  onRightClick(event:any) {
    event.preventDefault();
  }

  constructor() { }

}