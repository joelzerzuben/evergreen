import { Pipe, PipeTransform } from '@angular/core';
import {User} from './model/user';

@Pipe({
  name: 'userPlantFilter',
  pure: false
})
export class UserPlantFilterPipe implements PipeTransform {

  transform(items: any, filter: string):  User["plants"] {
    if (!items || !filter) {
      return items;
  }
  console.log( filter );
  // filter items array, items which match and return true will be
  // kept, false will be filtered out
  return items.filter((item: any) => item.name.includes(filter));
  }

}
