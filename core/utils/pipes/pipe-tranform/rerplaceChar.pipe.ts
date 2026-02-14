import { Pipe, PipeTransform } from '@angular/core';

/**
 * Discription : Pipe is used to get replace string
 */
@Pipe({ name: 'replace' })
export class ReplacePipe implements PipeTransform {

  /**
   * @param {string} value 
   * @param {string} strToReplace 
   * @param {string} replacementStr 
   * @description
   *  Funtion is return replace string by geting by string with replace string param
   */
  transform(value, strToReplace, replacementStr): string {

    if (!value || !strToReplace || !replacementStr) {
      return value;
    }

    return value.replace(new RegExp(this.escapeStr(strToReplace), 'g'), replacementStr);
  }

  escapeStr(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
}