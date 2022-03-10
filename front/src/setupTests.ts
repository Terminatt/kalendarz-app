import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/pl';

dayjs.locale('pl');
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
