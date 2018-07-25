import { combineReducers } from 'redux-immutable';

import { IResourcesStateRecord } from './resources.state';
import { GoogleMapsResourcesReducers } from '@app/store/resources/google-maps/google-maps.reducers';
import { DailyModelReducers } from '@app/store/resources/daily-model/daily-model.reducers';


export const ResourcesReducers = combineReducers<IResourcesStateRecord>({
  googleMaps: GoogleMapsResourcesReducers,
  dailyModel: DailyModelReducers,
});
