import { Dayjs } from 'dayjs';

export function getDayReservationRanges(day: Dayjs, hours: number[]): { startToday: Dayjs, endToday: Dayjs } {
    return {
        startToday: day.clone().hour(hours[0]),
        endToday: day.clone().hour(hours[hours.length - 1]).minute(45),
    };
}
