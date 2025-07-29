import React, {useCallback, useState} from "react";

import Button from "@khanacademy/wonder-blocks-button";

export type CopyButtonProps = {
    /**
     * The string to copy to the clipboard when the button is clicked.
     */
    text: string;
    /**
     * Optional: Additional props to pass to the underlying Wonder Blocks Button.
     */
    buttonProps?: React.ComponentProps<typeof Button>;
};

/**
 * Render a button that copies a string to the clipboard and shows feedback.
 *
 * @param text - The string to copy to the clipboard.
 * @param buttonProps - Additional props for the Wonder Blocks Button.
 * @returns The CopyButton component.
 *
 * @example
 * <CopyButton text="Hello world!" />
 */
const CopyButton: React.FC<CopyButtonProps> = ({text, buttonProps}) => {
    const [copied, setCopied] = useState(false);

    const handleClick = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            // Optionally, handle error (e.g., show a toast)
        }
    }, [text]);

    return (
        <Button {...buttonProps} onClick={handleClick}>
            {copied ? "Copied" : "Copy"}
        </Button>
    );
};

export default CopyButton;
