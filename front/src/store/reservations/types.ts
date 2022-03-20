import {
    BaseDataState, BaseItem, Id,
} from '@generics/generics';
import { Room } from '@store/rooms/types';
import { User } from '@store/user/types';
import { Dayjs } from 'dayjs';

export interface ReservationState<T extends BaseItem> extends BaseDataState<T> {
    hashMapData: ReservationHashMap;
    roomReservation: Reservation[]
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
    created: string;
}

export interface FullDataReservation extends Omit<Reservation, 'room'>, BaseItem, Omit<BaseReservation, 'room'> {
    room: Room;
    created: string;
}

export interface ReservationWithParsedDate extends BaseItem {
    start: Dayjs;
    end: Dayjs;
    color: string;
    user: User
}
