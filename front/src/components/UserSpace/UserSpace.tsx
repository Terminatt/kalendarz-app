import CustomButton from '@components/CustomButton/CustomButton';
import SigningModal from '@components/Modals/SigningModal/SigningModal';
import useLogged from '@hooks/useLogged';
import { RootState } from '@store/index';
import { openModal } from '@store/modals/slice';
import { ModalType } from '@store/modals/types';
import { logout } from '@store/user/asyncActions';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './UserSpace.less';

const UserSpace: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const { currentUser, isLoading } = user;
    const isLogged = useLogged();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openSigningModal = useCallback((modalType: ModalType) => {
        dispatch(openModal(modalType));
    }, []);

    const onLogout = useCallback(() => {
        dispatch(logout({
            onSuccess: () => navigate('/'),
            onError: () => navigate('/'),
        }));
    }, []);

    return isLogged ? (
        <div className="user-space">
            {currentUser?.firstName}
            &nbsp;
            {currentUser?.lastName}
            <CustomButton className="user-space-logout" loading={isLoading} disabled={isLoading} onClick={onLogout}>Wyloguj się</CustomButton>
        </div>
    ) : (
        <div className="signing">
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
        </div>
    );
};

export default UserSpace;
