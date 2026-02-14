import { Pipe, PipeTransform } from '@angular/core';

/**
 * Discription : This pipe is used to get number value in NumberBillion formate i.e:1M ,100K
 */
@Pipe({
  name: 'thousandSuff'
})
export class ThousandSuffixesPipe implements PipeTransform {

  /**
   * @param {any} input 
   * @param {any} args 
   * @description
   * Funtion used to get convert number formate into numberBillion formate
   */
  transform(input: any, args?: any): any {
    var exp, rounded,
      suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];
 
    if (Number.isNaN(input)|| input == null || input == '-') {
      return input;
    }

    if (Number(input) < 1000 ) {
      return Math.round(input);
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));
    var value:any
     value= (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1]
   
    // add plus sign to show in betslip
    // if(!value.includes('+')){
    //   value = "+".concat(value)
    //  }
    return value;
     (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }

}