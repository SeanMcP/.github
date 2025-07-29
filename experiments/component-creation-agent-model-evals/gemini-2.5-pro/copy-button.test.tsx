import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import CopyButton from "./copy-button";

describe("CopyButton", () => {
    beforeEach(() => {
        // @ts-expect-error - we're mocking the clipboard
        navigator.clipboard = {
            writeText: jest.fn(),
        };
    });

    it("should copy the text to the clipboard", () => {
        const textToCopy = "This is the text to be copied.";
        render(<CopyButton textToCopy={textToCopy} />);

        const button = screen.getByRole("button");
        userEvent.click(button);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy);
    });

    it("should change the label after clicking", () => {
        const textToCopy = "This is the text to be copied.";
        render(<CopyButton textToCopy={textToCopy} />);

        const button = screen.getByRole("button");
        expect(button.textContent).toBe("Copy");

        userEvent.click(button);

        expect(button.textContent).toBe("Copied");
    });
});
