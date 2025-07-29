import * as React from "react";
import {describe, it, expect, beforeEach} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {CopyButton} from "../copy-button";

describe("CopyButton", () => {
    beforeEach(() => {
        // Mock clipboard API
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn(() => Promise.resolve()),
            },
        });
    });

    it("should copy text to clipboard when clicked", async () => {
        // Arrange
        const textToCopy = "Test text";
        render(<CopyButton textToCopy={textToCopy} />);
        const button = screen.getByRole("button", {name: "Copy"});

        // Act
        await userEvent.click(button);

        // Assert
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy);
    });

    it("should change label after clicking", async () => {
        // Arrange
        render(
            <CopyButton
                textToCopy="Test text"
                defaultLabel="Copy text"
                copiedLabel="Text copied!"
            />,
        );
        const button = screen.getByRole("button", {name: "Copy text"});

        // Act
        await userEvent.click(button);

        // Assert
        expect(
            screen.getByRole("button", {name: "Text copied!"}),
        ).toBeInTheDocument();
        expect(
            screen.queryByRole("button", {name: "Copy text"}),
        ).not.toBeInTheDocument();
    });
});
