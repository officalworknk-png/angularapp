import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exposure',
  //pure:false
})
export class ExposureFilterPipe implements PipeTransform {

  to = " ➟ ";

  transform(runner, betSlip = []): any {
    let exposure = runner.playerExposure;
    if (betSlip.length == 0) {
      return exposure;
    }

    let find = betSlip.find(e => e.selectionId == runner.selectionId);

    if (find) {
      if (find.eventId == 0) { // BACK
        exposure = exposure + this.to + ((find.odds - 1) * find.exchangeStake);
      } else { // LAY
        exposure = exposure + this.to + ((find.odds - 1) * find.exchangeStake);
      }
    }
    return exposure;
  }

}
