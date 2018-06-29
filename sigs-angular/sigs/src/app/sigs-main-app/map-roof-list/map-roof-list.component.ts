import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';

import * as Immutable from 'immutable';
import { select } from '@angular-redux/store';
import { ImapActions } from '../imap/imap.actions';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-map-roof-list',
  templateUrl: './map-roof-list.component.html',
  styleUrls: ['./map-roof-list.component.css']
})
export class MapRoofListComponent implements OnInit {
  @select(['views', 'sigsMainApp', 'imap', 'rooves']) rooves: Observable<Immutable.Map<number, number>>;
  @select(['views', 'sigsMainApp', 'imap', 'selectedRoof']) selectedRoofObs: Observable<number>;

  selectedRoof: number;
  ngUnsubscribe = new Subject();

  constructor(private imapViewsActions: ImapActions) {  }

  ngOnInit() {
    this.selectedRoofObs
    .takeUntil(this.ngUnsubscribe)
    .subscribe(selectedRoof => this.selectedRoof = selectedRoof)
  }

  setSelectedRoof(roof: number) {
    this.imapViewsActions.setSelectedRoof(roof)
  }

  /**
  ----------------------------------------------------------------------------
  On destroy unsubscribe to everything
  ----------------------------------------------------------------------------
  */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
