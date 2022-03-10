import { BaseDataState, BaseItem, Id } from '@generics/generics';
import { User } from '@store/user/types';
import { Dayjs } from 'dayjs';

export interface ReservationState<T extends BaseItem> extends BaseDataState<T> {
    hashMapData: ReservationHashMap;
}

export interface ReservationHashMap {
    [key: string]: ReservationWithParsedDate[];
}

export interface BaseReservation {
    start: string;
    end: string;
    room: Id;
}

export interface Reservation extends BaseItem, BaseReservation {
    user: User;
}

export interface ReservationWithParsedDate extends BaseItem {
    start: Dayjs;
    end: Dayjs;
    color: string;
    user: User
}
