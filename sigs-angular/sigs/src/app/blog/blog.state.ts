import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';
import { IDashboardStateRecord, DashboardStateFactory } from '@app/blog/dashboard/dashboard.state';
import { IArticleStateRecord, ArticleStateFactory } from '@app/blog/article/article.state';


export interface IBlogState {
  dashboard: IDashboardStateRecord;
  article: IArticleStateRecord;
}

const Blog: IBlogState = {
  dashboard: DashboardStateFactory(),
  article: ArticleStateFactory(),
};

export const BlogStateFactory = makeTypedFactory<IBlogState, IBlogStateRecord>(Blog);

export interface IBlogStateRecord extends TypedRecord<IBlogStateRecord>, IBlogState { }
