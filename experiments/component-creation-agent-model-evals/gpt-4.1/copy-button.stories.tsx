import {Meta, StoryObj} from "@storybook/react";
import React from "react";

import CopyButton from "./copy-button.tsx";

const meta: Meta<typeof CopyButton> = {
    title: "Assessments/CopyButton",
    component: CopyButton,
    tags: ["autodocs"],
    args: {
        text: "Copy me!",
    },
};
export default meta;

type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
    args: {
        text: "Copy this text!",
    },
};
