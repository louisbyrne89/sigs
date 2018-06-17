import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';


interface IGoogleMapsResourcesState {
}

const GoogleMaps: IGoogleMapsResourcesState = {
};

export const GoogleMapsResourcesStateFactory = makeTypedFactory<IGoogleMapsResourcesState, IGoogleMapsResourcesStateRecord>(GoogleMaps);

export interface IGoogleMapsResourcesStateRecord extends TypedRecord<IGoogleMapsResourcesStateRecord>, IGoogleMapsResourcesState { }
