import { IActionPayload } from '@app/store/index.actions';
import { IDashboardStateRecord, DashboardStateFactory } from './dashboard.state'
import { DashboardActions } from './dashboard.actions';

export function DashboardReducers(
  state: IDashboardStateRecord = DashboardStateFactory(),
  action: IActionPayload<any>
): IDashboardStateRecord {

  switch (action.type) {

    case DashboardActions.RESET:
      return DashboardStateFactory();

    default:
      return state;
  }
}