import { combineReducers } from 'redux-immutable';

import { ISigsMainAppStateRecord } from './sigs-main-app.state';
import { ImapReducers } from '@app/sigs-main-app/imap/imap.reducers';
import { AnalysisReducers } from '@app/sigs-main-app/analysis/analysis.reducers';


export const SigsMainAppReducers = combineReducers<ISigsMainAppStateRecord>({
  imap: ImapReducers,
  analysis: AnalysisReducers,
});
