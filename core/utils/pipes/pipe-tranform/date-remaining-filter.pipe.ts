import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRemaining',
  // pure: true
})
export class DateRemainingFilterPipe implements PipeTransform {

  
  // transform(value: any): any {
  //   let remainingTime = "";
  //   if (value > 0) {
  //     remainingTime = `<label class="in-play-c tgreenip">In Play <img src="/assets/images/path.svg" alt="Icon" /></label>`
  //     return remainingTime;
  //   }

  //   let date: any = {
  //     d1: new Date(),
  //     d2: new Date(),
  //     val: "",
  //     diff: "",
  //     _diff: () => new Date(date.d2.getTime() - date.d1.getTime())
  //   }

  //   date.val = date.d2.getTime();
  //   date.val = date.val + Math.abs(value);
  //   date.d2 = new Date(date.val);
  //   date.diff = new Date(date._diff());


  //   let remainingDate = {
  //     yr: date.diff.getUTCFullYear() - 1970,
  //     mn: date.diff.getUTCMonth(),
  //     d: date.diff.getUTCDate() - 1,
  //     hr: date.diff.getUTCHours(),
  //     min: date.diff.getUTCMinutes(),
  //     sec: date.diff.getUTCSeconds(),
  //   }


  //   let dateStr = (remainingDate.d > 1) ? " days" : " day";
  //   let secStr = (remainingDate.sec > 0) ? " sec " : "";
  //   let minStr = (remainingDate.min > 0) ? " min " : "";
  //   let hrStr = (remainingDate.hr > 0) ? " hr " : "";

  //   switch (remainingDate.d) {
  //     case 0:
  //       remainingTime = "";
  //       break;
  //     case 1:
  //       remainingTime = "tomorrow";
  //       break;
  //     case 2:
  //       remainingTime = "day after tomorrow";
  //       break;
  //     default:
  //       remainingTime = "Starts in " + remainingDate.d + dateStr;
  //       break;
  //   }

  //   if (remainingTime !== "") {
  //     return '<label class="opacity">' + remainingTime; '</label>'
  //   }

  //   if (remainingDate.hr <= 0) {
  //     return '<label class="opacity">Starts in ' + remainingDate.min + minStr + remainingDate.sec + secStr; '</label>'
  //   }
  //   return '<label class="opacity">Starts in ' + remainingDate.hr + hrStr + remainingDate.min + minStr + remainingDate.sec + secStr; '</label>'
  // }
  
  public clearintervall: any = [];
  timedate=[]
  transform(value: any,element:any,cardType): any {
    var dateFormatpipe = new DatePipe('en-US');
    if(cardType=='inPlay'){ 
     
      return
    }
    var evnttime

    this.setFixtimeForEvent(element)
   // First time calculate remaining time
    // console.log("-->",element.timeRemaining)
  // this.timedate.push(element)
      var date1 = new Date(element.timeRemaining);
      var date2 = new Date();
      var diff = new Date(date2.getTime() - date1.getTime());
      var countDownDate: any
      
      if(element.eventstartTime){ // if event have fixed timing
        countDownDate = element.eventstartTime
      }
      else{
        countDownDate = diff
      }
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      // console.log('time',distance,countDownDate ,now)

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      // var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      var objtime = {}
      if (hours < 2 && days == 0) {
        objtime = {
          hours:  hours ,
          minutes: minutes,
          // seconds:seconds,
          comingSoon: false,
          countDownDate: true,
          matchtime: countDownDate.toString(),
        }
      }
      else {
        objtime = {
          hours:  hours ,
          minutes: minutes,
          // seconds:seconds,
          countDownDate: false,
          matchtime: countDownDate.toString(),
        }
      }

      evnttime = objtime
      // console.log('res1-->',distance )
      if (distance < 0) {
        objtime = {
          hours: 0,
          minutes: 0,
          seconds: 0,
          countDownDate: true,
          comingSoon: true,
          matchtime: "",
        }
        evnttime = objtime

      }

      var timeget=''
      var timestring=''

      if(evnttime.countDownDate){
                 var hourtime
                if(evnttime.hours>0){
                  hourtime=evnttime.hours+' hr '
                }
                else{
                  hourtime=' '
                }

                if(!evnttime.comingSoon){
                  timestring ='Starts in '+ hourtime  + evnttime.minutes+ ' min'
                }
                else{
                  timestring ='About to start'

                }
                timeget  =timestring
        }
      else{
        timeget= 'Starts at '+ dateFormatpipe.transform(evnttime.matchtime, 'HH:mm') 
      }
      // console.log("Firt time Today-->", timeget,evnttime)
      return timeget
  }

 

    /**
   * Function to set tommorow/today(above 2 hour) event fix time 
   * because api is not call and not get updated timeremaining key 
   * to set event time
   * @param firstEL 
   */
    setFixtimeForEvent(firstEL){
      let date1 = new Date(firstEL.timeRemaining);
      let date2 = new Date();
      let diff = new Date(date2.getTime() - date1.getTime()); // get event start timing
  
      //check how much hour left for start match
      let countDownDate: any
      countDownDate = diff
      let now = new Date().getTime();
      let distance = countDownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if(!firstEL.eventstartTime){
          firstEL.eventstartTime = diff
      }
  }

 
}
