import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventStartTime'
})
export class EventStartTimePipe implements PipeTransform {

  /**
     * @param num 
     * @param args 
     * @description
     * Function is return round of number
     */
  transform(num: any, args?: any): any {
        // var cureentDate = new Date();
        // let timeRem:number=Number(((cureentDate.getHours()*60*60*1000+cureentDate.getMinutes()*60*1000+cureentDate.getSeconds()*1000+cureentDate.getMilliseconds()-num)/(1000*60*60)).toFixed(2));
        // let remMinute:number=Number((timeRem%1)*60);
        // let remHour=Math.trunc(timeRem)

        var cureentDate = new Date();
        var newcureentDate = cureentDate.getTime() + 50000;
        var finaldata= newcureentDate-num
          return finaldata;
  }

}
