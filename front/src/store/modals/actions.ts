import { createAction } from '@reduxjs/toolkit';
import { ModalType } from './types';

export const openModal = createAction<ModalType>('OPEN_MODAL');
export const closeModal = createAction<void>('CLOSE_MODAL');
