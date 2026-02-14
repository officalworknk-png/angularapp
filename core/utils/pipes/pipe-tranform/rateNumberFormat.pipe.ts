import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'ratenumberFormat'})

export class RateNumberFormat implements PipeTransform {

  /**
   * 
   * @param num 
   * @param args
   * @description
   * Format Rate value for markets. 
   */
    transform(num: any, args?: any): any {
        if(isNaN(num) || num == null){
          return num;
        }
        let arrValue 
        let tostirng=String(num);
        if(tostirng.includes('.')){
          arrValue = tostirng.split(".");
          if(arrValue[1].length != undefined && arrValue[1].length == 2 && arrValue[1][1] == '9')
          {
           let formatNum=(Math.ceil(Number("."+arrValue[1]) *10))/10;
           num= parseFloat(arrValue[0])+parseFloat(String(formatNum))
            return num.toFixed(2);
    
          }else
          {
            num = parseFloat(num);
            return num.toFixed(2);
          }
        }
        num = parseFloat(num);
        return num.toFixed(2);
        // return Math.abs(Number(truncated)) >= 1.0e+5 ?  Math.abs(Number(truncated.toFixed(2))) / 1.0e+3 + "K" : Math.abs(Number(truncated.toFixed(2)));
      }
}