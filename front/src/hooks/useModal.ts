import { RootState } from '@store/index';
import { ModalType } from '@store/modals/types';
import { useSelector } from 'react-redux';

const useModalVisibility = (modalType: ModalType | ModalType[]): [boolean] => {
    const modal = useSelector((state: RootState) => state.modal);

    if (Array.isArray(modalType)) {
        const containsModalType = modalType.includes(modal.modalType);
        return [modal.isVisible && containsModalType];
    }

    return [modal.isVisible && modalType === modal.modalType];
};

export default useModalVisibility;
