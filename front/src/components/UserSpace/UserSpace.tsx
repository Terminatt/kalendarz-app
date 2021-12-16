import CustomButton from '@components/CustomButton/CustomButton';
import React, { useState } from 'react';

import './UserSpace.less';

const UserSpace: React.FC = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    return isLogged ? (
        <span>Test</span>
    ) : (
        <div className="signing">
            <div className="signing-login">Zaloguj się</div>
            <div className="signing-register">
                <CustomButton>Rejestracja</CustomButton>
                <div className="signing-forget-password">
                    Nie pamiętasz hasła?
                </div>
            </div>
        </div>
    );
};

export default UserSpace;
