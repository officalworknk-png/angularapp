import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stakeFormat'
})
export class LakhPipePipe implements PipeTransform {

    /**
   * @param {any} input 
   * @param {any} args 
   * @description
   * Funtion used to get convert number formate into numberBillion formate
   */
     transform(input: any, args?: any): any {
      let roundOff = (localStorage.getItem('showRoundOffStake') === 'true')
      if(!roundOff){
        return input
      }
      var value:any
      input = input.replace('+','')
      if( input>=100000){
        if((input/100000) % 1 == 0){
            value  = (input/100000)+'L'
        }
        else{
          value = input
        }
      }
      // else if(input=='+200000'){
      //   value='+2L'
      // }
      // else if(input=='+500000'){
      //   value='+5L'
      // }
      // else if(input=='+1000000'){
      //   value='+10L'
      // }
      // else if(input=='+2000000'){
      //   value='+20L'
      // }
      // else if(input=='+5000000'){
      //   value='+50L'
      // }
      // else if(input=='+10000000'){
      //   value='+100L'
      // }
      else{
        value=input 
      }

      if(args=='show'){
        value=value
      }
      else{
        value='+'+value 
      }

      return value;
    }

}
