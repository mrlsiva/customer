import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[artHost]'
})
export class HostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
