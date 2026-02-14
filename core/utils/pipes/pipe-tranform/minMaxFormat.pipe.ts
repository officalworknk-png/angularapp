import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'minMaxFormat' })

export class MinMaxFormatPipe implements PipeTransform {
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
                let num
                if(args=='noDeciaml'){
                    num=parseFloat(arrValue[0])
                }else{
                    num=parseFloat(arrValue[0]+"."+subStr)
                }
                return Math.abs(num)

            } 
        }
        num = parseFloat(num);
        // var truncated = (Math.floor(num * 100) / 100);
        return Math.abs(num)
    }
}