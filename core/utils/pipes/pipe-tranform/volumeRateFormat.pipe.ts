import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'volumeRateFormat'})

export class VolumeRateFormatPipe implements PipeTransform {
    transform(num: any, args?: any): any {
          
        if(isNaN(num) || num == null){
          return num;
        }
        num = parseFloat(num);
        return Math.abs(Math.round(num))
        // return Math.abs(Number(truncated)) >= 1.0e+5 ?  Math.abs(Number(truncated.toFixed(2))) / 1.0e+3 + "K" : Math.abs(Number(truncated.toFixed(2)));
      }
}