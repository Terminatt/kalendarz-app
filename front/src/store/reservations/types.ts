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
    confirmed?: boolean;
    room: Id;
}

export interface UpdateReservationPayload extends Partial<BaseReservation> {
    id: Id,
    user?: Id;
}
export interface Reservation extends BaseItem, BaseReservation {
    created: string;
    user: User;
}

export interface ReservationWithUserId extends Omit<Reservation, 'user'> {
    user: Id;
}

export interface FullDataReservation extends Omit<Reservation, 'room'>, BaseItem, Omit<BaseReservation, 'room'> {
    room: Room;
    created: string;
    user: User;
}

export interface ReservationWithParsedDate extends Omit<BaseReservation, 'start' | 'end' | 'room'>, BaseItem {
    start: Dayjs;
    end: Dayjs;
    color: string;
    user: User
}
