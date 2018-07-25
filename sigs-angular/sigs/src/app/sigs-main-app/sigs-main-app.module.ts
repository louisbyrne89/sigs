import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImapComponent } from './imap/imap.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { SigsMainComponent } from './sigs-main/sigs-main.component';
import { MapFormComponent } from './map-form/map-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule, WavesModule } from 'angular-bootstrap-md'
import { ImapActions } from './imap/imap.actions';
import { MapRoofListComponent } from './map-roof-list/map-roof-list.component';
import { DailyModelActions } from '@app/store/resources/daily-model/daily-model.actions';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputsModule,
    WavesModule,
    SharedModule,
  ],
  declarations: [ImapComponent, AnalysisComponent, SigsMainComponent, MapFormComponent, MapRoofListComponent],
  providers: [ImapActions, DailyModelActions]

})
export class SigsMainAppModule { }
