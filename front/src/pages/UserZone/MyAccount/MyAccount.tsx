import SingleColumnLayout from '@components/SingleColumnLayout/SingleColumnLayout';
import React from 'react';

import './MyAccount.less';

const MyAccount: React.FC = () => (
    <div className="my-account">
        <SingleColumnLayout headerText="Moje konto" className="my-account-content">
            Test
        </SingleColumnLayout>
    </div>
);

export default MyAccount;
