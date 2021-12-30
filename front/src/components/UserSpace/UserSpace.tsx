import CustomButton from '@components/CustomButton/CustomButton';
import SigningModal from '@components/Modals/SigningModal/SigningModal';
import { openModal } from '@store/modals/actions';
import { ModalType } from '@store/modals/types';
import ButtonGroup from 'antd/lib/button/button-group';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './UserSpace.less';

const UserSpace: React.FC = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const dispatch = useDispatch();

    const openSigningModal = (modalType: ModalType) => {
        dispatch(openModal(modalType));
    };

    return isLogged ? (
        <span>Test</span>
    ) : (
        <ButtonGroup className="signing">
            <CustomButton
                className="signing-login"
                variant="clear"
                onClick={() => openSigningModal(ModalType.LOGIN_MODAL)}
            >
                Zaloguj się
            </CustomButton>
            <div className="signing-register">
                <CustomButton
                    onClick={() => openSigningModal(ModalType.REGISTER_MODAL)}
                >
                    Rejestracja
                </CustomButton>
                <div className="signing-forget-password">
                    Nie pamiętasz hasła?
                </div>
            </div>

            <SigningModal />
        </ButtonGroup>
    );
};

export default UserSpace;
