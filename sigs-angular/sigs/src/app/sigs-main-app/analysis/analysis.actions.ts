import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { IAppStateRecord } from '@app/store/index.state';

@Injectable()
export class AnalysisActions {
  static RESET = 'analysis/RESET';
  constructor(
    private store: NgRedux<IAppStateRecord>,
  ) { }
}
