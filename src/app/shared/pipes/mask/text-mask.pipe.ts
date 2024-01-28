import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textMask'
})
export class TextMaskPipe implements PipeTransform {

  transform(plainText: string, visibleLength: number = 4, isFront: boolean = true): string {
    let visibleSection;
    if (!isFront) {
      visibleSection = plainText.slice(0, +visibleLength);
      return visibleSection + '***';
    } else {
      let maskedSection = plainText.slice(0, -visibleLength);
      let visibleSection = plainText.slice(-visibleLength);
      return maskedSection.replace(/./g, '*') + visibleSection;
    }
  }

}
