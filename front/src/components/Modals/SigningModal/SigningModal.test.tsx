import { ModalType } from '@store/modals/types';
import { fireEvent, render, waitFor } from '@utils/testing';
import React from 'react';
import SigningModal from './SigningModal';
import { matchMedia } from '@utils/testing';

describe('Signing Modal Component', () => {
    beforeEach(() => {
        matchMedia();
    });

    it('renders login modal', async () => {
        const { element } = render(
            <SigningModal />,
            {preloadedState: {modal: { isVisible: true, modalType: ModalType.LOGIN_MODAL }}}
        );

        expect(await element.queryByText('Logowanie')).not.toBeNull();
    });

    it('renders register modal', async () => {
        const { element } = render(
            <SigningModal />,
            {preloadedState: {modal: { isVisible: true, modalType: ModalType.REGISTER_MODAL }}}
        );

        expect(await element.queryByText('Rejestracja')).not.toBeNull();
    });
});
