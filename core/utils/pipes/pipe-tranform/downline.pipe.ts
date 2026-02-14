import { Pipe, PipeTransform } from '@angular/core';


/**
 * Discription:This pipe is used to get two decimal value for downline
 */
@Pipe({name: 'downlineNumber'})

export class DownlineNumerFormat implements PipeTransform {

    /**
     * @param {any} num 
     * @param {any} args
     * @description 
     * This function is used to get two decimal value for downline
     */
    transform(num: any, args?: any): any {

        if (isNaN(num) || num == null) {
            return num || 0;
        }
        let arrValue
        let tostirng = String(num);
        if (tostirng.includes('.')) {
            arrValue = tostirng.split(".");
            if (arrValue[1].length != undefined) {
                let subStr = String(arrValue[1])
                subStr = subStr.substring(0, 2);
                // let formatNum = (Number("." + subStr));
                let num=parseFloat(arrValue[0]+"."+subStr)
                return Math.abs(num).toFixed(2)

            } 
        }
        num = parseFloat(num);
        var truncated = (Math.floor(num * 100) / 100);
        return Math.abs(num).toFixed(2)
    }
}