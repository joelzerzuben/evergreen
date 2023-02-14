import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'userPlantWaterDays'
})
export class UserPlantWaterDaysPipe implements PipeTransform {

  transform(waesserung: any, min:number, max:number): string {
    moment.locale('de-DE');
    const WochentageText = new Array('Sonntag','Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag');
    let days = min;
    if( !isNaN(max) ){
      
      days = Math.ceil( (max+min)/2 )
    }
    let nextWateringDay =  moment(waesserung).add(days,'d');
    let nextWateringDayString = WochentageText[nextWateringDay.day()] + ', ' +  nextWateringDay.format('D.MMM')
    return nextWateringDayString;
  }

}
