import { createReducer } from '@reduxjs/toolkit';
import { closeModal, openModal } from './actions';
import { ModalState, ModalType } from './types';

const initialState: ModalState = {
    isVisible: false,
    modalType: ModalType.NONE,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(openModal, (state, action) => {
            state.isVisible = true;
            state.modalType = action.payload;
        }).addCase(closeModal, (state) => {
            state.isVisible = false;
            state.modalType = ModalType.NONE;
        });
});
