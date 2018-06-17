import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';
import { IImapStateRecord, ImapStateFactory } from '@app/sigs-main-app/imap/imap.state';
import { IAnalysisStateRecord, AnalysisStateFactory } from '@app/sigs-main-app/analysis/analysis.state';


export interface ISigsMainAppState {
  imap: IImapStateRecord;
  analysis: IAnalysisStateRecord;
}

const SigsMainApp: ISigsMainAppState = {
  imap: ImapStateFactory(),
  analysis: AnalysisStateFactory(),
};

export const SigsMainAppStateFactory = makeTypedFactory<ISigsMainAppState, ISigsMainAppStateRecord>(SigsMainApp);

export interface ISigsMainAppStateRecord extends TypedRecord<ISigsMainAppStateRecord>, ISigsMainAppState { }
