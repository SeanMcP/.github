import {StyleSheet} from "aphrodite";
import React, {useCallback, useState} from "react";

import Button from "@khanacademy/wonder-blocks-button";
import {useTimeout} from "@khanacademy/wonder-blocks-timing";

/**
 * Props for the CopyButton component.
 */
export interface Props {
    /**
     * The text to copy to clipboard when the button is clicked.
     */
    textToCopy: string;
    /**
     * Optional custom label for the button.
     * Defaults to "Copy" when not clicked and "Copied" when clicked.
     */
    label?: string;
    /**
     * Optional custom label shown after successful copy.
     * Defaults to "Copied".
     */
    copiedLabel?: string;
    /**
     * The duration (in milliseconds) that the button will show "Copied"
     * before returning to the original label. Defaults to 2000ms (2 seconds).
     */
    copiedDuration?: number;
    /**
     * Additional styles to apply to the button.
     */
    style?: any;
}

/**
 * A button component that copies a provided text string to the clipboard.
 * The button changes its label from "Copy" to "Copied" when clicked.
 */
export const CopyButton = ({
    textToCopy,
    label = "Copy",
    copiedLabel = "Copied",
    copiedDuration = 2000,
    style,
    ...rest
}: Props) => {
    const [copied, setCopied] = useState(false);
    
    // Use a timeout to revert the button label after copying
    const revertLabelTimeout = useTimeout(() => {
        setCopied(false);
    }, copiedDuration);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            revertLabelTimeout.set();
        } catch (error) {
            // If clipboard API fails, fallback to document.execCommand
            try {
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                
                // Make the textarea out of viewport
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                
                textArea.focus();
                textArea.select();
                
                const success = document.execCommand("copy");
                document.body.removeChild(textArea);
                
                if (success) {
                    setCopied(true);
                    revertLabelTimeout.set();
                }
            } catch (execCommandError) {
                // Silent failure for execCommand fallback
            }
        }
    }, [textToCopy, revertLabelTimeout]);

    return (
        <Button
            onClick={handleCopy}
            kind="secondary"
            style={[styles.button, style]}
            {...rest}
        >
            {copied ? copiedLabel : label}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        minInlineSize: 80,
    },
});

export default CopyButton;
