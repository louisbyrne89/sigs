import { combineReducers } from 'redux-immutable';

import { IViewsStateRecord } from './views.state';
import { BlogReducers } from '@app/blog/blog.reducers';
import { SigsMainAppReducers } from '@app/sigs-main-app/sigs-main-app.reducers';
import { CoreReducers } from '@app/core/core.reducers';


export const ViewsReducers = combineReducers<IViewsStateRecord>({
  blog: BlogReducers,
  sigsMainApp: SigsMainAppReducers,
  core: CoreReducers,
});
