import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from './custom-date/custom-date.pipe';
import { EllipsisPipe } from './ellipsis/ellipsis.pipe';
import { TimeAgoPipe } from './time-ago/time-ago.pipe';
import { RemoveUnderScorePipe } from './remove-under-score/remove-under-score.pipe';
import { SafeHtmlPipe } from './safe-html/safe-html.pipe';
import { TextMaskPipe } from './mask/text-mask.pipe';



@NgModule({
  declarations: [
    CustomDatePipe, EllipsisPipe, TimeAgoPipe, RemoveUnderScorePipe, SafeHtmlPipe, TextMaskPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
		CustomDatePipe,
    EllipsisPipe,
    TimeAgoPipe,
    RemoveUnderScorePipe,
    SafeHtmlPipe,
    TextMaskPipe
  ]
})
export class PipesModule { }
