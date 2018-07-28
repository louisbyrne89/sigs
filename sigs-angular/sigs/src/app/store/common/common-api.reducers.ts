import * as Immutable from 'immutable';
import { TypedRecord } from 'typed-immutable-record';

import { IActionPayload } from '../index.actions';
import { ApiResourceActions } from './common-api.actions';


export function CommonApiResourceReducer(
  state: TypedRecord<any>,
  action: IActionPayload<any>
): TypedRecord<any> {
  let storePath: any[];

  switch (action.type) {

    case ApiResourceActions.ADD:
      // merge the map provided as payload with the existing map
      return state.setIn(action.payload.storePath.concat('byId'),
        action.payload.value.reduce((map: Immutable.Map<number, any>, item: any) => {
            if (!Immutable.is(item, map.get(item.id))) {
              return map.set(item.id, item);
            } else {
              return map;
            }
          },
          state.getIn(action.payload.storePath.concat('byId'))
        )
      );

    case ApiResourceActions.REMOVE:
      storePath = action.payload.storePath.concat('byId');
      return state.removeIn(storePath.concat(action.payload.resourceId));

    case ApiResourceActions.UPDATE_PROPERTY:
      return state.setIn(action.payload.path.concat(action.payload.property), action.payload.value);

    default:
      return state;
  }
}
