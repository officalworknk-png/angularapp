import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'numberFormat'})

/**
 * class define a pipe with 2 decimal value and pass argument in pipe to defaine decimal value
 */
export class NumberFormatPipe implements PipeTransform {
    transform(num: any, args?: any): any {
        let val=100
        let fixednum=2

        if(args){ //pass args in pipe to define decimal value default decimal value is 2
          val= args==1 ? 10 : args==2 ? 100 : args==3 ? 1000 : 10
          fixednum=Number(args)
        }
        
        if(isNaN(num) || num == null){
          return num;
        }
        num = parseFloat(num);
        var truncated = (Math.floor(num * val) / val);
        return Math.abs(truncated).toFixed(fixednum);
        // return Math.abs(Number(truncated)) >= 1.0e+5 ?  Math.abs(Number(truncated.toFixed(2))) / 1.0e+3 + "K" : Math.abs(Number(truncated.toFixed(2)));
      }
}