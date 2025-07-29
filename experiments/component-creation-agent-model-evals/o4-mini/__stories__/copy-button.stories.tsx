import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import CopyButton, {CopyButtonProps} from "../copy-button";

const meta: Meta<typeof CopyButton> = {
    title: "Components/CopyButton",
    component: CopyButton,
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
    args: {
        text: "Sample text to copy",
        kind: "primary",
    },
};
