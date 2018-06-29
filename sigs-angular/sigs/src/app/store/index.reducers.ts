import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux-immutable';

import { configReducer } from './config/config.reducers';
import { IAppStateRecord } from './index.state';
import { propertiesKeyReducer } from './properties-key/properties-key.reducers';
import { propertiesReducer } from './properties/properties.reducers';
import { ResourcesReducers } from '@app/store/resources.reducers';
import { ViewsReducers } from '@app/store/views.reducers';
import { CommonReducer } from '@app/store/common/common.reducers';


export function reduceReducers(...reducers: any[]) {
  return (previousState: any, currentState: any) =>
    reducers.reduce(
      (p, r) => r(p, currentState),
      previousState
    );
}

export const rootReducer = reduceReducers(
  combineReducers<IAppStateRecord>({
    // config: configReducer,
    properties: propertiesReducer,
    propertiesKey: propertiesKeyReducer,
    router: routerReducer,
    resources: ResourcesReducers,
    views: ViewsReducers,
  }),
  CommonReducer
);
