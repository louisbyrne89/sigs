import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';
import * as Immutable from 'immutable';

interface IDailyModelValueState {
    id: number
    latitude: number;
    longitude: number;
    date: Date;
    value: number;
}

const DailyModelValue: IDailyModelValueState = {
    id: null,
    latitude: null,
    longitude: null,
    date: new Date(),
    value: null
};

export const DailyModelValueStateFactory = makeTypedFactory<IDailyModelValueState, IDailyModelValueStateRecord>(DailyModelValue);

export interface IDailyModelValueStateRecord extends TypedRecord<IDailyModelValueStateRecord>, IDailyModelValueState { };


interface IDailyModelState {
    byId: Immutable.Map<number, IDailyModelValueStateRecord>;
}

const DailyModel: IDailyModelState = {
    byId: Immutable.Map(),
};

export const DailyModelStateFactory = makeTypedFactory<IDailyModelState, IDailyModelStateRecord>(DailyModel);

export interface IDailyModelStateRecord extends TypedRecord<IDailyModelStateRecord>, IDailyModelState { };
