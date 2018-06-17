import { IActionPayload } from '@app/store/index.actions';
import { IAnalysisStateRecord, AnalysisStateFactory } from './analysis.state'
import { AnalysisActions } from './analysis.actions';

export function AnalysisReducers(
  state: IAnalysisStateRecord = AnalysisStateFactory(),
  action: IActionPayload<any>
): IAnalysisStateRecord {

  switch (action.type) {

    case AnalysisActions.RESET:
      return AnalysisStateFactory();

    default:
      return state;
  }
}