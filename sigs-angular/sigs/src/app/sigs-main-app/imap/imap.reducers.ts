import { IActionPayload } from '@app/store/index.actions';
import { IImapStateRecord, ImapStateFactory } from './imap.state'
import { ImapActions } from './imap.actions';

export function ImapReducers(
  state: IImapStateRecord = ImapStateFactory(),
  action: IActionPayload<any>
): IImapStateRecord {

  switch (action.type) {

    case ImapActions.RESET:
      return ImapStateFactory();

    default:
      return state;
  }
}