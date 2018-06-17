import { IActionPayload } from '@app/store/index.actions';
import { IToolbarStateRecord, ToolbarStateFactory } from './toolbar.state'
import { ToolbarActions } from './toolbar.actions';

export function ToolbarReducers(
  state: IToolbarStateRecord = ToolbarStateFactory(),
  action: IActionPayload<any>
): IToolbarStateRecord {

  switch (action.type) {

    case ToolbarActions.RESET:
      return ToolbarStateFactory();

    default:
      return state;
  }
}