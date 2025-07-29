import React, {useCallback, useState} from "react";

import Button from "@khanacademy/wonder-blocks-button";
import {useTimeout} from "@khanacademy/wonder-blocks-timing";
import {doNotTranslateYet} from "@khan/i18n";

export interface CopyButtonProps {
    /**
     * The text to copy to the clipboard when the button is clicked.
     */
    textToCopy: string;
    /**
     * Optional callback function called after successful copy operation.
     */
    onCopy?: () => void;
    /**
     * Optional props to pass through to the underlying Wonder Blocks Button.
     */
    buttonProps?: Omit<
        React.ComponentProps<typeof Button>,
        "onClick" | "children"
    >;
}

/**
 * A button component that copies text to the clipboard and provides visual feedback.
 * Extends Wonder Blocks Button with copy functionality.
 */
export const CopyButton: React.FC<CopyButtonProps> = ({
    textToCopy,
    onCopy,
    buttonProps = {},
}) => {
    const [isCopied, setIsCopied] = useState(false);

    const resetCopiedState = useTimeout(() => {
        setIsCopied(false);
    }, 2000);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            onCopy?.();

            // Reset the button state after 2 seconds
            resetCopiedState.set();
        } catch (error) {
            // If clipboard API fails, fallback to older method
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand("copy");
                setIsCopied(true);
                onCopy?.();

                // Reset the button state after 2 seconds
                resetCopiedState.set();
            } catch (_fallbackError) {
                // Silent fail for copy operation
            } finally {
                document.body.removeChild(textArea);
            }
        }
    }, [textToCopy, onCopy, resetCopiedState]);

    return (
        <Button {...buttonProps} onClick={handleCopy} disabled={isCopied}>
            {isCopied ? doNotTranslateYet`Copied` : doNotTranslateYet`Copy`}
        </Button>
    );
};
