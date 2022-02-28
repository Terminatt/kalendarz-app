import { BaseItem, Id } from '@generics/generics';

export interface BaseReservation {
    start: string;
    end: string;
    room: Id;
}

export interface Reservation extends BaseItem, BaseReservation {}
