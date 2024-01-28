import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, ...args: number[]): string {
    const length = args.length ? args[0] : 10;
    return value && value.length > length ? value.substr(0, length) + '...' : value;
  }

}
