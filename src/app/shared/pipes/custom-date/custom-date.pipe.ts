import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TimezoneService } from 'src/app/core/services/timezone/timezone.service';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  constructor(private timezone: TimezoneService) { }

  transform(value: any, format: string) {

    if (!value) { return ''; }
    if (!format) { format = 'shortDate'; }

    let dateConvert = this.timezone.utcToLocalISO(value)

    return formatDate(dateConvert, format, 'en-US');
}

}
