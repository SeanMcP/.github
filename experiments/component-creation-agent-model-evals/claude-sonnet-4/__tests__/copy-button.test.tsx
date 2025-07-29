import {beforeEach, describe, expect, it} from "@jest/globals";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {CopyButton} from "../copy-button.tsx";

// Mock the clipboard API
const mockWriteText = jest.fn() as jest.MockedFunction<
    typeof navigator.clipboard.writeText
>;
Object.assign(navigator, {
    clipboard: {
        writeText: mockWriteText,
    },
});

// Mock document.execCommand for fallback test
const mockExecCommand = jest.fn() as jest.MockedFunction<
    typeof document.execCommand
>;
Object.assign(document, {
    execCommand: mockExecCommand,
});

describe("CopyButton", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Reset the clipboard API to work by default
        mockWriteText.mockResolvedValue(undefined);
    });

    it("copies text to clipboard when clicked", async () => {
        const textToCopy = "Hello, World!";
        const user = userEvent.setup();

        render(<CopyButton textToCopy={textToCopy} />);

        const button = screen.getByRole("button", {name: /copy/i});
        await user.click(button);

        expect(mockWriteText).toHaveBeenCalledWith(textToCopy);
        expect(mockWriteText).toHaveBeenCalledTimes(1);
    });

    it("changes label from Copy to Copied after clicking", async () => {
        const textToCopy = "Test text";
        const user = userEvent.setup();

        render(<CopyButton textToCopy={textToCopy} />);

        // Initially shows "Copy"
        expect(screen.getByRole("button", {name: /copy/i})).toBeInTheDocument();

        const button = screen.getByRole("button", {name: /copy/i});
        await user.click(button);

        // After clicking, shows "Copied"
        await waitFor(() => {
            expect(
                screen.getByRole("button", {name: /copied/i}),
            ).toBeInTheDocument();
        });

        // Button should be disabled when showing "Copied"
        expect(screen.getByRole("button", {name: /copied/i})).toBeDisabled();
    });

    it("calls onCopy callback when text is successfully copied", async () => {
        const textToCopy = "Callback test";
        const onCopyMock = jest.fn();
        const user = userEvent.setup();

        render(<CopyButton textToCopy={textToCopy} onCopy={onCopyMock} />);

        const button = screen.getByRole("button", {name: /copy/i});
        await user.click(button);

        await waitFor(() => {
            expect(onCopyMock).toHaveBeenCalledTimes(1);
        });
    });

    it("falls back to execCommand when clipboard API fails", async () => {
        const textToCopy = "Fallback test";
        const user = userEvent.setup();

        // Mock clipboard API to fail
        mockWriteText.mockRejectedValue(
            new Error("Clipboard API not available"),
        );
        mockExecCommand.mockReturnValue(true);

        // Mock document methods for fallback
        const mockAppendChild = jest.fn();
        const mockRemoveChild = jest.fn();
        const mockCreateElement = jest.fn().mockReturnValue({
            value: "",
            style: {},
            focus: jest.fn(),
            select: jest.fn(),
        });

        Object.assign(document, {
            createElement: mockCreateElement,
            body: {
                appendChild: mockAppendChild,
                removeChild: mockRemoveChild,
            },
        });

        render(<CopyButton textToCopy={textToCopy} />);

        const button = screen.getByRole("button", {name: /copy/i});
        await user.click(button);

        // Should try clipboard API first
        expect(mockWriteText).toHaveBeenCalledWith(textToCopy);

        // Should fall back to execCommand
        await waitFor(() => {
            expect(mockCreateElement).toHaveBeenCalledWith("textarea");
        });
        expect(mockExecCommand).toHaveBeenCalledWith("copy");
    });

    it("passes through custom button props", () => {
        const textToCopy = "Props test";
        const buttonProps = {
            kind: "primary" as const,
            size: "large" as const,
            "data-testid": "custom-copy-button",
        };

        render(
            <CopyButton textToCopy={textToCopy} buttonProps={buttonProps} />,
        );

        const button = screen.getByTestId("custom-copy-button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("primary"); // Wonder Blocks adds CSS classes based on props
    });

    it("resets to Copy state after timeout", async () => {
        const textToCopy = "Timeout test";
        const user = userEvent.setup();

        // Mock setTimeout to execute immediately for testing
        jest.spyOn(globalThis, "setTimeout").mockImplementation((callback) => {
            if (typeof callback === "function") {
                callback();
            }
            return 0 as any;
        });

        render(<CopyButton textToCopy={textToCopy} />);

        const button = screen.getByRole("button", {name: /copy/i});
        await user.click(button);

        // Should show "Copied" initially
        await waitFor(() => {
            expect(
                screen.getByRole("button", {name: /copied/i}),
            ).toBeInTheDocument();
        });

        // Should reset to "Copy" after timeout
        await waitFor(() => {
            expect(
                screen.getByRole("button", {name: /copy/i}),
            ).toBeInTheDocument();
        });

        // Restore setTimeout
        (globalThis.setTimeout as any).mockRestore();
    });
});
