
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Body} from "@khanacademy/wonder-blocks-typography";

import CopyButton from "../copy-button.tsx";

/**
CopyButton is a component that extends Wonder Blocks Button to add clipboard 
functionality. When clicked, it copies the provided text to the clipboard and 
changes its label from "Copy" to "Copied" for a specified duration.
*/
const meta: Meta<typeof CopyButton> = {
    component: CopyButton,
    title: "assessments/CopyButton",
    parameters: {
        docs: {
            description: {
                component: "A button that copies text to the clipboard",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof CopyButton>;

/**
 * Default configuration for the CopyButton component.
 */
export const Default: Story = {
    args: {
        textToCopy: "This text will be copied to clipboard",
    },
    render: (args) => (
        <View>
            <CopyButton {...args} />
        </View>
    ),
};

/**
 * Example with custom labels.
 */
export const CustomLabels: Story = {
    args: {
        textToCopy: "Custom labeled text",
        label: "Copy Text",
        copiedLabel: "Text Copied!",
    },
    render: (args) => (
        <View>
            <CopyButton {...args} />
        </View>
    ),
};

/**
 * Example with shorter duration for the "Copied" state.
 */
export const ShortDuration: Story = {
    args: {
        textToCopy: "Quick feedback text",
        copiedDuration: 1000, // 1 second
    },
    render: (args) => (
        <View>
            <CopyButton {...args} />
        </View>
    ),
};

/**
 * Example usage in context, showing how the CopyButton might be used
 * alongside other elements.
 */
export const InContext: Story = {
    args: {
        textToCopy: "https://www.khanacademy.org/assessments/example",
    },
    render: (args) => (
        <View style={{padding: spacing.medium_16}}>
            <Body>Assessment URL:</Body>
            <View 
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBlockStart: spacing.xSmall_8,
                }}>
                <Body style={{marginInlineEnd: spacing.small_12}}>
                    {args.textToCopy}
                </Body>
                <CopyButton {...args} />
            </View>
        </View>
    ),
};
