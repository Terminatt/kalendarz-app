import { BLOCK_COLORS } from '@constants/constants';
import { getRandomItem } from '@utils/general';
import dayjs from 'dayjs';
import { Reservation, ReservationHashMap } from './types';

export function parseReservationData(reservations: Reservation[]): ReservationHashMap {
    const hashMapData: ReservationHashMap = {};
    reservations.forEach((el) => {
        if (!hashMapData[el.room]) {
            hashMapData[el.room] = [];
        }

        hashMapData[el.room].push({
            ...el,
            start: dayjs(el.start),
            end: dayjs(el.end),
            color: getRandomItem(BLOCK_COLORS),
        });
    });

    return hashMapData;
}
