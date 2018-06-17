import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';
import { IBlogStateRecord, BlogStateFactory } from '@app/blog/blog.state';
import { ISigsMainAppStateRecord, SigsMainAppStateFactory } from '@app/sigs-main-app/sigs-main-app.state';
import { ICoreStateRecord, CoreStateFactory } from '@app/core/core.state';


export interface IViewsState {
  blog: IBlogStateRecord;
  sigsMainApp: ISigsMainAppStateRecord;
  core: ICoreStateRecord;
}

const Views: IViewsState = {
  blog: BlogStateFactory(),
  sigsMainApp: SigsMainAppStateFactory(),
  core: CoreStateFactory(),
};

export const ViewsStateFactory = makeTypedFactory<IViewsState, IViewsStateRecord>(Views);

export interface IViewsStateRecord extends TypedRecord<IViewsStateRecord>, IViewsState { }
