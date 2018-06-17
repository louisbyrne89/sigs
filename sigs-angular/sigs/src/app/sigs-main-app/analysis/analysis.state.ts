import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';


interface IAnalysisState {
}

const Analysis: IAnalysisState = {
};

export const AnalysisStateFactory = makeTypedFactory<IAnalysisState, IAnalysisStateRecord>(Analysis);

export interface IAnalysisStateRecord extends TypedRecord<IAnalysisStateRecord>, IAnalysisState { }
