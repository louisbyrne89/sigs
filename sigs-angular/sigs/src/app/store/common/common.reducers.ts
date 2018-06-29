import { CommonActions } from './common.actions';
import { IActionPayload } from './../index.actions';
import { TypedRecord } from 'typed-immutable-record';


export function CommonReducer(
  state: TypedRecord <any>,
  action: IActionPayload <any>
  ): TypedRecord <any> {

  switch (action.type) {
    case CommonActions.UPDATE_PROPERTY:
      return state.setIn(
        action.payload.path.concat([action.payload.prop]),
        action.payload.value
      );
    case CommonActions.RESET:
      return state.setIn(
        action.payload.path.concat([action.payload.prop]),
        action.payload.callback()
      )
    default:
      return state;
  }
}
