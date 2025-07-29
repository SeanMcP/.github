import {afterEach, beforeEach, describe, expect, it} from "@jest/globals";
import {act, fireEvent, render, screen} from "@testing-library/react";
import React from "react";

import {CopyButton} from "../copy-button.tsx";

describe("CopyButton", () => {
    // Mock the clipboard API
    const originalClipboard = globalThis.navigator.clipboard;
    const mockClipboard = {
        writeText: jest.fn(() => Promise.resolve()),
    };

    beforeEach(() => {
        // Setup clipboard mock
        Object.defineProperty(navigator, "clipboard", {
            value: mockClipboard,
            writable: true,
        });

        // Reset the mock before each test
        mockClipboard.writeText.mockClear();

        // Mock the setTimeout and clearTimeout functions
        jest.useFakeTimers();
    });

    afterEach(() => {
        // Restore the original clipboard
        Object.defineProperty(navigator, "clipboard", {
            value: originalClipboard,
            writable: true,
        });

        // Restore real timers
        jest.useRealTimers();
    });

    it("should copy text to the clipboard when clicked", async () => {
        // Arrange
        const textToCopy = "Test text to copy";
        render(<CopyButton textToCopy={textToCopy} />);
        const button = screen.getByRole("button", {name: "Copy"});
        
        // Act
        await act(() => {
            fireEvent.click(button);
        });
        
        // Assert
        expect(mockClipboard.writeText).toHaveBeenCalledWith(textToCopy);
    });

    it("should change the label from 'Copy' to 'Copied' after clicking", async () => {
        // Arrange
        render(<CopyButton textToCopy="Test text" />);
        const button = screen.getByRole("button", {name: "Copy"});
        
        // Act
        await act(() => {
            fireEvent.click(button);
        });
        
        // Assert
        expect(
            screen.getByRole("button", {name: "Copied"}),
        ).toBeInTheDocument();
        expect(
            screen.queryByRole("button", {name: "Copy"}),
        ).not.toBeInTheDocument();
    });

    it("should revert back to 'Copy' after duration expires", async () => {
        // Arrange
        const copiedDuration = 2000; // 2 seconds
        render(
            <CopyButton
                textToCopy="Test text"
                copiedDuration={copiedDuration}
            />,
        );
        const button = screen.getByRole("button", {name: "Copy"});
        
        // Act - Click the button
        await act(() => {
            fireEvent.click(button);
            return Promise.resolve();
        });
        
                // Assert
        expect(
            screen.getByRole("button", {name: "Copied"}),
        ).toBeInTheDocument();
        
        // Act - Fast-forward time
        act(() => {
            jest.advanceTimersByTime(copiedDuration);
        });
        
        // Assert - Button should be back to "Copy"
        expect(
            screen.getByRole("button", {name: "Copy"}),
        ).toBeInTheDocument();
        expect(
            screen.queryByRole("button", {name: "Copied"}),
        ).not.toBeInTheDocument();
    });

    it("should use custom labels if provided", async () => {
        // Arrange
        const customLabel = "Copy Code";
        const customCopiedLabel = "Code Copied!";
        render(
            <CopyButton
                textToCopy="Test code"
                label={customLabel}
                copiedLabel={customCopiedLabel}
            />,
        );
        
        // Act
        await act(() => {
            fireEvent.click(screen.getByRole("button", {name: customLabel}));
            return Promise.resolve();
        });
        
        // Assert
        expect(
            screen.getByRole("button", {name: customCopiedLabel}),
        ).toBeInTheDocument();
    });
});
