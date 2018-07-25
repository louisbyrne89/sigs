import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';
import * as Immutable from 'immutable';

interface IAddressState {
    line1: string;
    postcode: string;
    
}

const AddressState: IAddressState = {
    line1: null,
    postcode: null,
}

export const AddressStateFactory = makeTypedFactory<IAddressState, IAddressStateRecord>(AddressState);

export interface IAddressStateRecord extends TypedRecord<IAddressStateRecord>, IAddressState { };

interface IPositionsState {
    latitude: number;
    longitude: number;
}

const PositionsState: IPositionsState = {
    latitude: null,
    longitude: null,
}

export const PositionsStateFactory = makeTypedFactory<IPositionsState, IPositionsStateRecord>(PositionsState);

export interface IPositionsStateRecord extends TypedRecord<IPositionsStateRecord>, IPositionsState { };

interface IImapState {
    address: IAddressStateRecord;
    positions: IPositionsStateRecord;
    rooves: Immutable.Map<number, number>;
    selectedRoof: number;
    stage: number;
}

const Imap: IImapState = {
    address: AddressStateFactory(),
    positions: PositionsStateFactory(),
    rooves: Immutable.Map(),
    selectedRoof: null,
    stage: 0
};

export const ImapStateFactory = makeTypedFactory<IImapState, IImapStateRecord>(Imap);

export interface IImapStateRecord extends TypedRecord<IImapStateRecord>, IImapState { };
