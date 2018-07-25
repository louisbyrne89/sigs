import { IPositionsStateRecord } from '../imap/imap.state';
import { DailyModelActions } from '../../store/resources/daily-model/daily-model.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit, OnDestroy {
  @select(["views", "sigsMainApp", "imap", "positions"]) positionsObs: Observable<IPositionsStateRecord>
  ngUnsubscribe = new Subject();
  constructor(
    private dailyModelActions: DailyModelActions
  ) { }

  ngOnInit() {
    this.positionsObs
    .takeUntil(this.ngUnsubscribe)
    .filter(x => x !== undefined)
    .subscribe((positions: IPositionsStateRecord) => {
      if (positions.latitude !== null && positions.longitude !== null) {
        this.dailyModelActions.makeAPIRequest({
          latitude: positions.latitude,
          longitude: positions.longitude
        });
      }
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
