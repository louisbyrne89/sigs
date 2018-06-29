import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { } from '@types/googlemaps';

import { IAppStateRecord } from '@app/store/index.state';

@Injectable()
export class CommonActions {
  static RESET = 'commpon_actions/RESET';
  static UPDATE_PROPERTY = 'common_actions/UPDATE_PROPERTY';
  path: string[];
  constructor(
    private commonStore: NgRedux<IAppStateRecord>,
  ) { }
}
