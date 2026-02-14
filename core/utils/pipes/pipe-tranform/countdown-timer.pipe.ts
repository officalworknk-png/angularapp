import { Pipe, PipeTransform } from '@angular/core';
import { map, takeWhile } from 'rxjs/operators';
import { interval, Observable } from 'rxjs';

@Pipe({
  name: 'countdownTimer'
})
export class CountdownTimerPipe implements PipeTransform {
  transform(targetDate: Date): Observable<string> {
    let intervalDuration = 0;
    setTimeout(() => {
      intervalDuration = 1000;
    }, 1000);
    let val = interval(intervalDuration).pipe(
      map(() => this.calculateCountdown(targetDate)),
      takeWhile(countdown => countdown !== 'Countdown expired')
      );
    return val
  }

  private calculateCountdown(targetDate: Date): string {
    const now = new Date().getTime();
    const timeRemaining = targetDate.getTime() - now;
    if (timeRemaining > 0) {
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // console.log(`${days}d ${this.twoDigitFormat(hours)}h ${this.twoDigitFormat(minutes)}m ${this.twoDigitFormat(seconds)}s`)
      if(days==0 && this.twoDigitFormat(hours)=='00'){
        if(this.twoDigitFormat(minutes)=='00' && this.twoDigitFormat(seconds)=='00'){
          return ` `
        }
        else{
          return `${this.twoDigitFormat(minutes)}m ${this.twoDigitFormat(seconds)}s`;
        }
      }
      else if(days==0){
        return `${this.twoDigitFormat(hours)}h ${this.twoDigitFormat(minutes)}m ${this.twoDigitFormat(seconds)}s`;
      }
      else{
        return `${days}d ${this.twoDigitFormat(hours)}h ${this.twoDigitFormat(minutes)}m ${this.twoDigitFormat(seconds)}s`;
      }
    } 
    else {
      return 'Countdown expired';
    }
  }

  private twoDigitFormat(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}
