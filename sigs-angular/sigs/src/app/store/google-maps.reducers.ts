import { IActionPayload } from '@app/store/index.actions';
import { IGoogleMapsResourcesStateRecord, GoogleMapsResourcesStateFactory } from './google-maps.state'
import { GoogleMapsResourcesActions } from './google-maps.actions';

export function GoogleMapsResourcesReducers(
  state: IGoogleMapsResourcesStateRecord = GoogleMapsResourcesStateFactory(),
  action: IActionPayload<any>
): IGoogleMapsResourcesStateRecord {

  switch (action.type) {

    case GoogleMapsResourcesActions.RESET:
      return GoogleMapsResourcesStateFactory();

    default:
      return state;
  }
}