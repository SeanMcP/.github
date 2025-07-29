import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import CopyButton from '../copy-button';

describe('CopyButton', () => {
    const textToCopy = 'Hello, World!';

    beforeEach(() => {
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn().mockResolvedValue(undefined),
            },
        });
    });

    it('copies text to clipboard when clicked', async () => {
        render(<CopyButton text={textToCopy} />);
        const button = screen.getByRole('button', {name: /copy/i});
        fireEvent.click(button);
        await waitFor(() => {
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy);
        });
    });

    it('changes label to Copied after clicking', async () => {
        render(<CopyButton text={textToCopy} />);
        const button = screen.getByRole('button', {name: /copy/i});
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByRole('button', {name: /copied/i})).toBeInTheDocument();
        });
    });
});
