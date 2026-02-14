import { Pipe, PipeTransform } from '@angular/core';


/**
 * Discription:This Pipe is to get NUmberMillion formate number
 */
@Pipe({name: 'numberMillion'})

export class NumberMillionPipe implements PipeTransform {

    /**
     * @param {any} number 
     * @param {any} args 
     * @description
     * Funtion used to get convert number formate into numberBillion formate
     */
    transform(number: any, args?: any): any {
     
       // getformat(){
            if(number == 0) {
            return 0;
        }
        else
        {        
          // hundreds
          if(number <= 999){
            return number ;
          }
          // thousands
          else if(number >= 1000 && number <= 999999){
            return (number / 1000).toFixed(1) + 'K';
          }
          // millions
          else if(number >= 1000000 && number <= 999999999){
            return (number / 1000000).toFixed(1) + 'M';
          }
          // billions
          else if(number >= 1000000000 && number <= 999999999999){
            return (number / 1000000).toFixed(1) + 'M';
          }
          else
            return number ;
          }
       // }
      }
}