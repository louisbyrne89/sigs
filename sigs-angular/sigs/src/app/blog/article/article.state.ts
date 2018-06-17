import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';


interface IArticleState {
}

const Article: IArticleState = {
};

export const ArticleStateFactory = makeTypedFactory<IArticleState, IArticleStateRecord>(Article);

export interface IArticleStateRecord extends TypedRecord<IArticleStateRecord>, IArticleState { }
