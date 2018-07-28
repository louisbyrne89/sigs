import { IActionPayload } from '@app/store/index.actions';
import { IDailyModelStateRecord, DailyModelStateFactory } from './daily-model.state'
import { DailyModelActions } from './daily-model.actions';

export function DailyModelReducers(
  state: IDailyModelStateRecord = DailyModelStateFactory(),
  action: IActionPayload<any>
): IDailyModelStateRecord {

  switch (action.type) {

    case DailyModelActions.RESET:
      return DailyModelStateFactory();

    default:
      return state;
  }
}