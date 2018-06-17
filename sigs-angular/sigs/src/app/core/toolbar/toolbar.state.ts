import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';


interface IToolbarState {
}

const Toolbar: IToolbarState = {
};

export const ToolbarStateFactory = makeTypedFactory<IToolbarState, IToolbarStateRecord>(Toolbar);

export interface IToolbarStateRecord extends TypedRecord<IToolbarStateRecord>, IToolbarState { }
