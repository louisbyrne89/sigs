import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';


interface IDashboardState {
}

const Dashboard: IDashboardState = {
};

export const DashboardStateFactory = makeTypedFactory<IDashboardState, IDashboardStateRecord>(Dashboard);

export interface IDashboardStateRecord extends TypedRecord<IDashboardStateRecord>, IDashboardState { }
