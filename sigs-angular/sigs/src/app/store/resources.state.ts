import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';
import { IGoogleMapsResourcesStateRecord, GoogleMapsResourcesStateFactory } from '@app/store/resources/google-maps/google-maps.state';


export interface IResourcesState {
  googleMaps: IGoogleMapsResourcesStateRecord;
}

const Resources: IResourcesState = {
  googleMaps: GoogleMapsResourcesStateFactory(),
};

export const ResourcesStateFactory = makeTypedFactory<IResourcesState, IResourcesStateRecord>(Resources);

export interface IResourcesStateRecord extends TypedRecord<IResourcesStateRecord>, IResourcesState { }
