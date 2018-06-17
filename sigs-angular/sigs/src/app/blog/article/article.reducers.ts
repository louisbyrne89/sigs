import { IActionPayload } from '@app/store/index.actions';
import { IArticleStateRecord, ArticleStateFactory } from './article.state'
import { ArticleActions } from './article.actions';

export function ArticleReducers(
  state: IArticleStateRecord = ArticleStateFactory(),
  action: IActionPayload<any>
): IArticleStateRecord {

  switch (action.type) {

    case ArticleActions.RESET:
      return ArticleStateFactory();

    default:
      return state;
  }
}