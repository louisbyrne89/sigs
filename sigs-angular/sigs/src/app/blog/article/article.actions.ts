import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { IAppStateRecord } from '@app/store/index.state';

@Injectable()
export class ArticleActions {
  static RESET = 'article/RESET';
  constructor(
    private store: NgRedux<IAppStateRecord>,
  ) { }
}
