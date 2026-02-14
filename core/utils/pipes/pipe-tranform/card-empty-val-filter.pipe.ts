import { Pipe, PipeTransform } from '@angular/core';

/**
 * Discription:pipe use for show dash '-' value when value less the zero
 */
@Pipe({
  name: 'cardEmptyVal'
})
export class CardEmptyValFilterPipe implements PipeTransform {

  /**
   * @param {any} points 
   * @description
   * Funtion used for show '-' dash value if value less then zero
   */
  transform(points:any): any {
    points = parseFloat(points);
    return (points>0)?points:'-';
  }

}
