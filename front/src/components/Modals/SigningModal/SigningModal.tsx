import { RootState } from '@store/index';
import Modal from 'antd/lib/modal/Modal';
import useModal from '@hooks/useModal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalType } from '@store/modals/types';
import { closeModal } from '@store/modals/actions';

const SigningModal: React.FC = () => {
    const modal = useSelector((state: RootState) => state.modal);
    const [visible] = useModal([ModalType.LOGIN_MODAL, ModalType.REGISTER_MODAL]);
    const dispatch = useDispatch();

    const onCancel = () => {
        dispatch(closeModal());
    };

    const renderTitle = () => (<h2>{modal.modalType === ModalType.LOGIN_MODAL ? 'Logowanie' : 'Rejestracja'}</h2>);

    return (
        <Modal
            title={renderTitle()}
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            Signing Modal
        </Modal>
    );
};

export default SigningModal;
