import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchormeDirective } from './anchorme/anchorme.directive';
import { HostDirective } from './host/host.directive';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';
import { ConversionDirective } from './conversion/conversion.directive';
import { AlphaNumericOnlyDirective } from './input-restrict/alpha-numeric-only.directive';

@NgModule({
  declarations: [
    AnchormeDirective,
    HostDirective,
    ClickOutsideDirective,
    ConversionDirective,
    AlphaNumericOnlyDirective,
	],
  imports: [
    CommonModule
  ],
  exports: [
    AnchormeDirective,
    HostDirective,
    ClickOutsideDirective,
    ConversionDirective,
    AlphaNumericOnlyDirective,
  ]
})
export class DirectivesModule { }
