import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';
import { IToolbarStateRecord, ToolbarStateFactory } from '@app/core/toolbar/toolbar.state';


export interface ICoreState {
  toolbar: IToolbarStateRecord;
}

const Core: ICoreState = {
  toolbar: ToolbarStateFactory(),
};

export const CoreStateFactory = makeTypedFactory<ICoreState, ICoreStateRecord>(Core);

export interface ICoreStateRecord extends TypedRecord<ICoreStateRecord>, ICoreState { }
