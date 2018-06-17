import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { IAppStateRecord } from '@app/store/index.state';

@Injectable()
export class ImapActions {
  static RESET = 'imap/RESET';
  constructor(
    private store: NgRedux<IAppStateRecord>,
  ) { }
}
