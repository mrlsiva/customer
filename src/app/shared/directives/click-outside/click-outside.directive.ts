import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[ahClickOutside]'
})
export class ClickOutsideDirective {

  @Output() appOutsideClick = new EventEmitter();


  constructor(private _elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      // console.log('Clicking outside the div');
      this.appOutsideClick.emit(false);
    } else {
      // console.log('Clicking inside the div');
      this.appOutsideClick.emit(true);
    }
  }

}
