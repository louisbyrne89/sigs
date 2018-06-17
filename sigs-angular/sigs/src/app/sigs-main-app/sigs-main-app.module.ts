import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImapComponent } from './imap/imap.component';
import { AnalysisComponent } from './analysis/analysis.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImapComponent, AnalysisComponent]
})
export class SigsMainAppModule { }
