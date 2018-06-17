import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';


interface IImapState {
}

const Imap: IImapState = {
};

export const ImapStateFactory = makeTypedFactory<IImapState, IImapStateRecord>(Imap);

export interface IImapStateRecord extends TypedRecord<IImapStateRecord>, IImapState { }
