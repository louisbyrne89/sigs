import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';

import { ConfigFactory, IConfigRecord } from './config/config.state';
import { IPropertiesRecord, PropertiesFactory } from './properties/properties.state';
import { IResourcesStateRecord, ResourcesStateFactory } from '@app/store/resources.state';
import { IViewsStateRecord, ViewsStateFactory } from '@app/store/views.state';

export interface IAppState {
  config: IConfigRecord;
  properties: IPropertiesRecord;
  propertiesKey: string;
  router: string;
  resources: IResourcesStateRecord;
  views: IViewsStateRecord;
}

const INITIAL_APP_STATE: IAppState = {
  config: ConfigFactory(),
  properties: PropertiesFactory(),
  propertiesKey: '',
  router: '',
  resources: ResourcesStateFactory(),
  views: ViewsStateFactory(),
};

export const AppFactory = makeTypedFactory<IAppState, IAppStateRecord>(INITIAL_APP_STATE);

export interface IAppStateRecord extends TypedRecord<IAppStateRecord>, IAppState { }
