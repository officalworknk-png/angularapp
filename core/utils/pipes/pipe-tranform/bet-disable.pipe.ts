import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'disableClick'
})
export class BetDisablePipe implements PipeTransform {

  /**
   * function to disable odd when odd value is greter then 11
   * @param value 
   * @param args 
   * @returns 
   */
  transform(value: any, type: any): any {
    if(value>11 && type!=undefined && type!='Bookmaker_Market'){
      return 'disclick';
    }
    return '';
  }

}
