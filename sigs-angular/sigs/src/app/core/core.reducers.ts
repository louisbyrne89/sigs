import { combineReducers } from 'redux-immutable';

import { ICoreStateRecord } from './core.state';
import { ToolbarReducers } from '@app/core/toolbar/toolbar.reducers';


export const CoreReducers = combineReducers<ICoreStateRecord>({
  toolbar: ToolbarReducers,
});
