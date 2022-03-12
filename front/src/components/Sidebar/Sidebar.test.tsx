import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';
import Sidebar from './Sidebar';

describe('Sidebar Component', () => {
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <MemoryRouter>
                    <Sidebar headerText="This is a text" visible top={<div>Top Test</div>} bottom={<div>Bottom Test</div>} />
                </MemoryRouter>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('renders the content properly', async () => {
        const topText = 'Top Test';
        const bottomText = 'Bottom Test';
        const headerText = "Header text";

        const element = render(
            <MemoryRouter>
                <Sidebar headerText={headerText} visible top={<div>{topText}</div>} bottom={<div>{bottomText}</div>}  />
            </MemoryRouter>
        );
        expect(await element.queryByText(topText)).not.toBeNull();
        expect(await element.queryByText(bottomText)).not.toBeNull();
        expect(await element.queryByText(headerText)).not.toBeNull();

    });

    it('does not display when small screen and not visible', async () => {
        const topText = 'Top Test';
        const bottomText = 'Bottom Test';

        const element = render(
            <MemoryRouter>
                <Sidebar isSmallScreen visible={false} top={<div>{topText}</div>} bottom={<div>{bottomText}</div>}  />
            </MemoryRouter>
        );

        expect(await element.queryByTestId('sidebar')).toBeNull();
    });

    it('is displayed when isSmallScreen', async () => {
        const topText = 'Top Test';
        const bottomText = 'Bottom Test';

        const element = render(
            <MemoryRouter>
                <Sidebar isSmallScreen visible={true} top={<div>{topText}</div>} bottom={<div>{bottomText}</div>}  />
            </MemoryRouter>
        );

        expect(await element.queryByTestId('sidebar')).not.toBeNull()
    });

    it('does not have display none when visible', () => {
        const topText = 'Top Test';
        const bottomText = 'Bottom Test';

        const element = render(
            <MemoryRouter>
                <Sidebar visible top={<div>{topText}</div>} bottom={<div>{bottomText}</div>}  />
            </MemoryRouter>
        );

        expect(element.getByTestId('sidebar')).not.toHaveStyle('display: none;');
    });

    it('renders close button when small screen', async () => {
        const topText = 'Top Test';
        const bottomText = 'Bottom Test';

        const element = render(
            <MemoryRouter>
                <Sidebar isSmallScreen visible top={<div>{topText}</div>} bottom={<div>{bottomText}</div>}  />
            </MemoryRouter>
        );

        expect(await element.queryByTestId('close-btn')).not.toBeNull;
    });

    it('triggers on close', async () => {
        const topText = 'Top Test';
        const bottomText = 'Bottom Test';
        const onClose = jest.fn()

        const element = render(
            <MemoryRouter>
                <Sidebar onClose={onClose} isSmallScreen visible top={<div>{topText}</div>} bottom={<div>{bottomText}</div>}  />
            </MemoryRouter>
        );
        
        fireEvent.click(await element.findByTestId('close-btn'))
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
