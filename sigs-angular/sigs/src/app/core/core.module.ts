import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NavbarModule, WavesModule } from 'angular-bootstrap-md'


@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    NavbarModule,
    WavesModule
  ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent]
})
export class CoreModule { }
