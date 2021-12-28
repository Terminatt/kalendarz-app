import { RootState } from '@store/index';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { useSelector } from 'react-redux';

const SigningModal: React.FC = () => {
    const modal = useSelector((state: RootState) => state.user);

    return (
        <Modal>
            Signing Modal
        </Modal>
    );
};
