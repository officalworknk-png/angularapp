import { Pipe, PipeTransform } from '@angular/core';

/**
 * Discription:This pipe is return tha filter value from ka list
 */
@Pipe({
  name: 'InputInputSearchFilterPipe'
})
export class InputSearchFilterPipe implements PipeTransform {

  /**
   * @param {any} list 
   * @param {string} filterText 
   * @description
   * Funtion return the filter value
   */
  transform(list: any[], filterText: string): any {
    if(list.length==0){return list;}
    return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
