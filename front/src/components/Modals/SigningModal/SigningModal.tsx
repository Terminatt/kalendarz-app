import { RootState } from '@store/index';
import Modal from 'antd/lib/modal/Modal';
import useModalVisibility from '@hooks/useModal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalType } from '@store/modals/types';
import { closeModal } from '@store/modals/slice';
import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';

const SigningModal: React.FC = () => {
    const modal = useSelector((state: RootState) => state.modal);
    const [visible] = useModalVisibility([ModalType.LOGIN_MODAL, ModalType.REGISTER_MODAL]);
    const isLogin = modal.modalType === ModalType.LOGIN_MODAL;
    const dispatch = useDispatch();

    const onCancel = () => {
        dispatch(closeModal());
    };

    const renderTitle = () => (<h2>{isLogin ? 'Logowanie' : 'Rejestracja'}</h2>);

    return (
        <Modal
            centered
            destroyOnClose
            title={renderTitle()}
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            {isLogin ? <LoginForm /> : (
                <RegisterForm />
            )}
        </Modal>
    );
};

export default SigningModal;
