/* eslint-disable jsx-a11y/control-has-associated-label */
import HugeDivider from '@components/HugeDivider/HugeDivider';
import { DAY_NAMES_FULL, WORKING_HOURS } from '@constants/constants';
import { Id } from '@generics/generics';
import { Room } from '@store/rooms/types';
import { joinClassNames, parseDateToDay } from '@utils/general';
import { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import SwitcherLayout from '@components/Switcher/SwitcherLayout/SwitcherLayout';
import { ReservationHashMap, ReservationWithParsedDate } from '@store/reservations/types';

import './ReservationPanel.less';
import { Tooltip } from 'antd';

export interface ReservationInterval {
    start: string;
    end: string;
    room: Id;
}
export interface ReservationPanelProps {
    day: Dayjs;
    className?: string;
    timeBlockContainerClassname?: string;
    rooms: Room[];
    reservations: ReservationHashMap;
    onReserve?: (intervals: ReservationInterval[]) => void;
    onLeftSwitcherClick?: () => void;
    onRightSwitcherClick?: () => void;
}
export interface SelectedBlocksHashMap {
    [key: string]: TimeInterval;
}

export interface TimeInterval {
    start: number | null;
    startTextValue: string | null;
    end: number | null;
    endTextValue: string | null;
    room: Room;
}

export interface ReservationsPerRoom {
    [key: string]: ReservationRange[];
}

export interface ReservationRange {
    reservation?: ReservationWithParsedDate,
    start: Dayjs,
    end: Dayjs
}

const ReservationPanel: React.FC<ReservationPanelProps> = (props) => {
    const {
        day, className, timeBlockContainerClassname, rooms, reservations, onReserve, onLeftSwitcherClick, onRightSwitcherClick,
    } = props;
    const [reservationsPerRoom, setReservationsPerRoom] = useState<ReservationsPerRoom>({});

    const prepareData = useCallback((room: Room): ReservationRange[] | null => {
        const roomReservation = reservations[room.id];
        const ranges: ReservationRange[] = [];
        let startToday = day.clone().hour(8);
        const endToday = day.clone().hour(19).minute(45);

        if (!roomReservation) {
            return null;
        }

        roomReservation.forEach((el) => {
            if (el.start.isSame(startToday)) {
                ranges.push({ reservation: el, start: el.start, end: el.end });
                startToday = el.end.clone().add(15, 'minutes');
                return;
            }
            const diff = el.start.diff(startToday, 'minutes');

            ranges.push({
                start: startToday,
                end: startToday.minute(diff - 15),
            });

            ranges.push({
                reservation: el,
                start: el.start,
                end: el.end,
            });
            startToday = el.end.clone().add(15, 'minutes');
        });

        ranges.push({
            start: startToday,
            end: endToday,
        });

        return ranges;
    }, [reservations]);

    useEffect(() => {
        const newReservationsPerRoom: ReservationsPerRoom = {};
        rooms.forEach((el) => {
            const ranges = prepareData(el);
            if (!ranges) {
                return;
            }
            newReservationsPerRoom[el.id] = ranges;
        });
        setReservationsPerRoom(newReservationsPerRoom);
    }, [rooms, reservations]);

    const createBlocks = (endIndex: number, start: Dayjs) => {
        const elements: React.ReactElement[] = [];
        let time = start;
        for (let i = 0; i <= endIndex; i++) {
            const displayTime = time.format('HH:mm');
            elements.push(
                <Tooltip key={displayTime} overlay={displayTime}>
                    <td
                        colSpan={2}
                        className="block-table-row-time"
                    />
                </Tooltip>,
            );
            const minute = time.get('minute');
            time = time.minute(minute + 15);
        }

        return elements;
    };

    const renderBlocks = () => {
        const startToday = day.clone().hour(8);
        const endToday = day.clone().hour(19).minute(45);
        const blocks = endToday.diff(startToday, 'minutes') / 15;
        return createBlocks(blocks, startToday);
    };

    const renderBlocksWithReservation = (room: Room) => {
        let elements: React.ReactElement[] = [];
        reservationsPerRoom[room.id].forEach((el, index) => {
            const diff = el.end.diff(el.start, 'minutes');
            const blocks = (diff / 15);
            const cols = blocks * 2;

            if (el.reservation) {
                elements.push(
                    <td
                    // eslint-disable-next-line react/no-array-index-key
                        key={el.reservation.id + index}
                        colSpan={cols + 2}
                        style={{ backgroundColor: el.reservation.color }}
                        className="block-table-row-reserved"
                    >
                        {`${el.reservation.user.firstName} ${el.reservation.user.lastName}`}
                    </td>,
                );
                return;
            }
            elements = [...elements, ...createBlocks(blocks, el.start)];
        });

        return elements;
    };

    return (
        <div className={joinClassNames(['reservation-panel', className])}>
            <HugeDivider className="reservation-panel-divider" text={DAY_NAMES_FULL[day.day()]} />
            <div className="reservation-panel-switcher">
                <SwitcherLayout onLeftClick={onLeftSwitcherClick} onRightClick={onRightSwitcherClick}>
                    {parseDateToDay(day)}
                </SwitcherLayout>
            </div>
            <div className={joinClassNames(['reservation-panel-container', timeBlockContainerClassname])}>
                <div className="reservation-panel-container-table">
                    <table className="block-table">
                        <colgroup>
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                            <col span={8} width={150} />
                        </colgroup>
                        <thead>
                            <tr className="block-table-row">
                                <th colSpan={8} className="block-table-row-col block-table-row-header">Nazwa sali</th>
                                <th colSpan={8} className="block-table-row-col block-table-row-header block-table-row-left">Liczba miejsc</th>
                                {WORKING_HOURS.map((el) => (
                                    <th colSpan={8} key={el} className="block-table-row-col block-table-row-header">
                                        {el}
                                        :00
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (
                                <tr key={room.id} className="block-table-row block-table-row-room">
                                    <th colSpan={8} style={{ backgroundColor: room.type.color }} className="block-table-row-col block-table-row-header">{room.name}</th>
                                    <th
                                        colSpan={8}
                                        style={{ backgroundColor: room.type.color }}
                                        className="block-table-row-col block-table-row-header block-table-row-left"
                                    >
                                        {room.capacity}

                                    </th>
                                    {reservationsPerRoom[room.id] ? renderBlocksWithReservation(room) : renderBlocks()}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReservationPanel;
