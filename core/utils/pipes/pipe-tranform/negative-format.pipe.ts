import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'negativeFormat'})

export class NegativeFormatPipe implements PipeTransform {
    transform(num: any, args?: any): any {
          
        if(isNaN(num) || num == null){
          return num;
        }
        num = parseFloat(num);
        var truncated = (Math.floor(num * 100) / 100);
        return truncated.toFixed(2);
        // return Math.abs(Number(truncated)) >= 1.0e+5 ?  Math.abs(Number(truncated.toFixed(2))) / 1.0e+3 + "K" : Math.abs(Number(truncated.toFixed(2)));
      }
}