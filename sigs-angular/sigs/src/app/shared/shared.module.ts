import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'angular-bootstrap-md';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule

  ],
  declarations: [ChartComponent],
  exports: [ChartComponent],
})
export class SharedModule { }
