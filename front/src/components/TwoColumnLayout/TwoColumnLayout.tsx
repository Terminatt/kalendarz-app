import { GenericReactContent } from '@generics/generics';
import { joinClassNames } from '@utils/general';
import React from 'react';
import './TwoColumnLayout.less';

export interface TwoColumnLayoutProps {
  left: GenericReactContent;
  right: GenericReactContent;
  className?: string;
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = (props) => {
    const { left, right, className } = props;
    return (
        <div className={joinClassNames(['two-column', className])}>
            <div className="two-column-left">
                {left}
            </div>
            <div className="two-column-right">
                {right}
            </div>
        </div>
    );
};

export default TwoColumnLayout;
