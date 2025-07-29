import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CopyButton from "../CopyButton";

describe("CopyButton", () => {
    it("should copy text to the clipboard when clicked", async () => {
        // Arrange
        const textToCopy = "Test Clipboard Text";
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn(),
            },
        });

        render(<CopyButton textToCopy={textToCopy} />);

        // Act
        const button = screen.getByRole("button", {name: /copy/i});
        await userEvent.click(button);

        // Assert
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy);
    });

    it("should change the label to 'Copied' after clicking", async () => {
        // Arrange
        const textToCopy = "Another Test Text";
        render(<CopyButton textToCopy={textToCopy} />);

        // Act
        const button = screen.getByRole("button", {name: /copy/i});
        await userEvent.click(button);

        // Assert
        expect(button).toHaveTextContent(/copied/i);
    });
});
