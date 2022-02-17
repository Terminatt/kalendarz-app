import ColoredBlock from '@components/ColoredBlock/ColoredBlock';
import HugeDivider from '@components/HugeDivider/HugeDivider';
import { DAY_NAMES_FULL, WORKING_HOURS } from '@constants/constants';
import { Room } from '@store/rooms/types';
import { joinClassNames } from '@utils/general';
import { Dayjs } from 'dayjs';
import React from 'react';

import './ReservationPanel.less';

export interface ReservationPanelProps {
    day: Dayjs;
    className?: string;
    rooms: Room[]
}

const ReservationPanel: React.FC<ReservationPanelProps> = (props) => {
    const { day, className, rooms } = props;

    return (
        <div className={joinClassNames(['reservation-panel', className])}>
            <HugeDivider className="reservation-panel-divider" text={DAY_NAMES_FULL[day.day()]} />
            <div className="reservation-panel-switcher">
                test
            </div>
            <div className="reservation-panel-content">
                <div className="reservation-panel-content-left">
                    <div className="reservation-panel-content-row">
                        <ColoredBlock className="reservation-panel-content-header-block-left">Nazwa sali</ColoredBlock>
                        <ColoredBlock className="reservation-panel-content-header-block-left">Ilość miejsc</ColoredBlock>
                    </div>
                    {rooms.map((el) => (
                        <div key={el.id} className="reservation-panel-content-row">
                            <ColoredBlock bgColor={el.type.color} className="reservation-panel-content-header-block-left">{el.name}</ColoredBlock>
                            <ColoredBlock bgColor={el.type.color} className="reservation-panel-content-header-block-left">100</ColoredBlock>
                        </div>
                    ))}
                </div>
                <div className="reservation-panel-content-right">
                    <div className="reservation-panel-content-row reservation-panel-content-row-right">
                        {WORKING_HOURS.map((el) => (
                            <ColoredBlock key={el} className="reservation-panel-content-header-block-right">{el}</ColoredBlock>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationPanel;
