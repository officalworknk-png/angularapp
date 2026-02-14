import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'removeSign' })

export class RemoveSign implements PipeTransform {
  // for admin risk mangment decimal value issue 
  transform(value: any, ...args: any[]): any {
    if(isNaN(value) || value == null){
      return value;
    }
    // console.log(value)
    value = value.toString()

    value = value.replace('-','')
    return value;
  }
}