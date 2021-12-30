import { createSlice, createAction } from '@reduxjs/toolkit';
import { ModalState, ModalType } from './types';

export const openModal = createAction<ModalType>('OPEN_MODAL');
export const closeModal = createAction<void>('CLOSE_MODAL');

const initialState: ModalState = {
    isVisible: false,
    modalType: ModalType.NONE,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(openModal, (state, action) => {
                state.isVisible = true;
                state.modalType = action.payload;
            }).addCase(closeModal, (state) => {
                state.isVisible = false;
                state.modalType = ModalType.NONE;
            });
    },
});
