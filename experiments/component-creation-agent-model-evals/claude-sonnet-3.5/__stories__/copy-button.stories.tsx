import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {CopyButton} from "./copy-button";

const meta: Meta<typeof CopyButton> = {
    title: "Assessments/CopyButton",
    component: CopyButton,
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/**
 * Default usage of the CopyButton component.
 */
export const Default: Story = {
    args: {
        textToCopy: "Hello, World!",
        defaultLabel: "Copy text",
        copiedLabel: "Text copied!",
    },
};

/**
 * CopyButton with default labels.
 */
export const WithDefaultLabels: Story = {
    args: {
        textToCopy: "Some text to copy",
    },
};
