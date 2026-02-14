import { Directive, HostListener } from '@angular/core';


/**
 * Description:Class used for make directive for prevent copy paste from keyboard
 */
@Directive({
  selector: '[appBlockCopyPaste]'
})
export class BlockCopyPasteDirective {
  constructor() { }

  /**
   * @param {KeyboardEvent} e 
   * @description
   * This funtion prevent paste from keyboard event 
   */
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  /**
   * This funtion prevent copy from keyboard event 
   * @param {KeyboardEvent} e 
   */
  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  /**
   * This funtion prevent cut from keyboard event 
   * @param {KeyboardEvent} e 
   */
  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }
}