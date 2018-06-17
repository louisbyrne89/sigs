import { combineReducers } from 'redux-immutable';

import { IBlogStateRecord } from './blog.state';
import { DashboardReducers } from '@app/blog/dashboard/dashboard.reducers';
import { ArticleReducers } from '@app/blog/article/article.reducers';


export const BlogReducers = combineReducers<IBlogStateRecord>({
  dashboard: DashboardReducers,
  article: ArticleReducers,
});
