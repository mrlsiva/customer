import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from './pipes/pipes.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountdownModule } from 'ngx-countdown';



const moduleList = [
  MaterialModule,
  ComponentsModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  SlickCarouselModule,
  PipesModule,
  DirectivesModule,
  NgSelectModule,
  CountdownModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ...moduleList,
  ],
  exports: [
    ...moduleList,
  ],
  providers: [
    DatePipe,
  ],
})
export class SharedModule { }
