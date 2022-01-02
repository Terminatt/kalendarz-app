import CustomButton from '@components/CustomButton/CustomButton';
import SigningModal from '@components/Modals/SigningModal/SigningModal';
import { RootState } from '@store/index';
import { openModal } from '@store/modals/slice';
import { ModalType } from '@store/modals/types';
import ButtonGroup from 'antd/lib/button/button-group';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './UserSpace.less';

const UserSpace: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.data);
    const isLogged = !!user;
    const dispatch = useDispatch();

    const openSigningModal = useCallback((modalType: ModalType) => {
        dispatch(openModal(modalType));
    }, []);

    return isLogged ? (
        <span>
            {`${user.title} ${user.firstName} ${user.lastName}`}
        </span>
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
