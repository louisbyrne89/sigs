import { combineReducers } from 'redux-immutable';

import { IResourcesStateRecord } from './resources.state';
import { GoogleMapsResourcesReducers } from '@app/store/google-maps.reducers';


export const ResourcesReducers = combineReducers<IResourcesStateRecord>({
  googleMaps: GoogleMapsResourcesReducers,
});
