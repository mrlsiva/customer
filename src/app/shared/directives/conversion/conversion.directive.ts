import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[qdo365Conversion]'
})

export class ConversionDirective {

  private _isPercentage: boolean = true;

  @Input() set conversionMode(mode: string) {
    // console.log(mode);
    this._isPercentage = mode === 'PERCENTAGE';
    this.updateValue(this.control?.control?.value || '');
  }

  constructor(private control: NgControl) {}

  convertValue(value: number) {
    if (this._isPercentage) {
      // return (value * 100).toFixed(2) + '%';
      return (value) + '%';
    } else {
      // return (value / 100).toFixed(2) + ' Rs';
      return (value) + ' Rs';
    }
  }

  containsUnit(value: string): boolean {
    return /[a-z]/i.test(value);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    this.updateValue(value)
  }

  updateValue(value: string) {
    if(!value || value == ''){
      return;
    }
    let newValue = '';

    if (this.containsUnit(value)) {
      newValue = this.convertValue(parseFloat(value));
    } else {
      newValue = this.convertValue(parseFloat(value.replace(/[^0-9.]/g, '')));
    }

    this.control.control.setValue(newValue);
  }
}
