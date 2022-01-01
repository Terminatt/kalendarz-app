import { RootState } from '@store/index';
import Modal from 'antd/lib/modal/Modal';
import useModalVisibility from '@hooks/useModal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalType } from '@store/modals/types';
import { changeModalType, closeModal } from '@store/modals/slice';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';

import './SigningModal.less';

const SigningModal: React.FC = () => {
    const modal = useSelector((state: RootState) => state.modal);
    const [visible] = useModalVisibility([ModalType.LOGIN_MODAL, ModalType.REGISTER_MODAL]);
    const isLogin = modal.modalType === ModalType.LOGIN_MODAL;
    const dispatch = useDispatch();

    const onCancel = () => {
        dispatch(closeModal());
    };

    const renderTitle = () => (<h2>{isLogin ? 'Logowanie' : 'Rejestracja'}</h2>);

    const onFormSubmit = (modalType: ModalType) => {
        dispatch(changeModalType(modalType));
    };

    const animateModalSwitch = (node: React.ReactNode) => (
        <SwitchTransition>
            {isLogin ? (
                <CSSTransition key="login" classNames="opacity" timeout={{ enter: 500, exit: 300 }}>
                    {node}
                </CSSTransition>
            ) : (
                <CSSTransition key="register" classNames="opacity" timeout={{ enter: 500, exit: 300 }}>
                    {node}
                </CSSTransition>
            )}
        </SwitchTransition>
    );

    return (
        <Modal
            centered
            destroyOnClose
            modalRender={animateModalSwitch}
            title={renderTitle()}
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            {isLogin ? (
                <LoginForm />
            ) : (
                <RegisterForm onFinishCallback={() => onFormSubmit(ModalType.LOGIN_MODAL)} />
            )}
        </Modal>
    );
};

export default SigningModal;
