import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';
import { IGoogleMapsResourcesStateRecord, GoogleMapsResourcesStateFactory } from '@app/store/resources/google-maps/google-maps.state';
import { IDailyModelStateRecord, DailyModelStateFactory } from '@app/store/resources/daily-model/daily-model.state';


export interface IResourcesState {
  googleMaps: IGoogleMapsResourcesStateRecord;
  dailyModel: IDailyModelStateRecord;
}

const Resources: IResourcesState = {
  googleMaps: GoogleMapsResourcesStateFactory(),
  dailyModel: DailyModelStateFactory(),
};

export const ResourcesStateFactory = makeTypedFactory<IResourcesState, IResourcesStateRecord>(Resources);

export interface IResourcesStateRecord extends TypedRecord<IResourcesStateRecord>, IResourcesState { }
