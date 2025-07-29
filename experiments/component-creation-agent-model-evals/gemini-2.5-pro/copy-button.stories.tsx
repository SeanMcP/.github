import type {Meta, StoryObj} from "@storybook/react";
import * as React from "react";

import CopyButton from "./copy-button";

export default {
    title: "Assessments/Components/CopyButton",
    component: CopyButton,
} as Meta<typeof CopyButton>;

export const Default: StoryObj<typeof CopyButton> = {
    args: {
        textToCopy: "This is the text to be copied.",
    },
};
