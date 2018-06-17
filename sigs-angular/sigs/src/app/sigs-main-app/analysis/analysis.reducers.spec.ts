import { TestBed } from '@angular/core/testing';

import { rootReducer } from '@app/store/index.reducers';
import { AppFactory } from '@app/store/index.state';

describe('AnalysisReducers', () => {
  const state1 = AppStateFactory();
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });
});
