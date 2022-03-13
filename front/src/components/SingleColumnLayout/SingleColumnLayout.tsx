import { GenericReactContent } from '@generics/generics';
import { joinClassNames } from '@utils/general';
import React from 'react';
import './SingleColumnLayout.less';

export interface SingleColumnLayoutProps {
    className?: string;
    headerText?: string;
    children: GenericReactContent
}

const SingleColumnLayout: React.FC<SingleColumnLayoutProps> = (props) => {
    const { className, headerText, children } = props;

    return (
        <div className={joinClassNames(['single-column', className])}>
            <h2>
                {headerText}
            </h2>
            {children}
        </div>
    );
};

export default SingleColumnLayout;
