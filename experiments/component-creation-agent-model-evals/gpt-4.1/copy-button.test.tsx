import "@testing-library/jest-dom";

import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import CopyButton from "./copy-button.tsx";

describe("CopyButton", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should copy the provided text to the clipboard", async () => {
        // Arrange
        const writeText = jest.fn();
        // @ts-expect-error: override clipboard for test
        globalThis.navigator.clipboard = {writeText};
        render(<CopyButton text="Hello, world!" />);

        // Act
        await userEvent.click(screen.getByRole("button", {name: /copy/i}));

        // Assert
        expect(writeText).toHaveBeenCalledWith("Hello, world!");
    });

    it("should change label to 'Copied' after clicking", async () => {
        // Arrange
        const writeText = jest.fn().mockResolvedValue(undefined);
        // @ts-expect-error: override clipboard for test
        globalThis.navigator.clipboard = {writeText};
        render(<CopyButton text="Copy this!" />);

        // Act
        await userEvent.click(screen.getByRole("button", {name: /copy/i}));

        // Assert
        expect(
            screen.getByRole("button", {name: /copied/i}),
        ).toBeInTheDocument();
    });
});
