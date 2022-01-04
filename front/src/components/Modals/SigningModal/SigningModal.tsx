import { RootState } from '@store/index';
import Modal from 'antd/lib/modal/Modal';
import useModalVisibility from '@hooks/useModal';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalType } from '@store/modals/types';
import { changeModalType, closeModal } from '@store/modals/slice';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';

import './SigningModal.less';

const SigningModal: React.FC = () => {
    const modal = useSelector((state: RootState) => state.modal);
    const visible = useModalVisibility([ModalType.LOGIN_MODAL, ModalType.REGISTER_MODAL]);
    const isLogin = modal.modalType === ModalType.LOGIN_MODAL;
    const dispatch = useDispatch();

    const close = useCallback(() => {
        dispatch(closeModal());
    }, []);

    const renderTitle = useCallback(() => (<h2>{isLogin ? 'Logowanie' : 'Rejestracja'}</h2>), [isLogin]);

    const onFormSubmit = useCallback((modalType: ModalType) => {
        dispatch(changeModalType(modalType));
    }, []);

    const animateModalSwitch = useCallback((node: React.ReactNode) => (
        <SwitchTransition>
            <CSSTransition key={isLogin ? 'login' : 'register'} classNames="opacity" timeout={{ enter: 500, exit: 300 }}>
                {node}
            </CSSTransition>
        </SwitchTransition>
    ), [isLogin]);

    return (
        <Modal
            centered
            destroyOnClose
            modalRender={animateModalSwitch}
            title={renderTitle()}
            visible={visible}
            onCancel={close}
            footer={null}
        >
            {isLogin ? (
                <LoginForm onFinishCallback={close} />
            ) : (
                <RegisterForm onFinishCallback={() => onFormSubmit(ModalType.LOGIN_MODAL)} />
            )}
        </Modal>
    );
};

export default SigningModal;
