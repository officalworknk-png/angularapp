import { Pipe, PipeTransform } from '@angular/core';


/**
 * Discription:This pipe is to get Round of number 
 */
@Pipe({name: 'numberRound'})

export class NumberRoundOffPipe implements PipeTransform {

    /**
     * @param num 
     * @param args 
     * @description
     * Function is return round of number
     */
    transform(num: any, args?: any): any {
     
        if(isNaN(num) || num == null){
          return num || 0;
        }
            
        num = parseFloat(num);
        var truncated = (Math.floor(num * 100) / 100);
        return Math.abs(num).toFixed(2);
      }
}