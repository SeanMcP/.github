import * as React from "react";
import Button from "@khanacademy/wonder-blocks-button";
import {useCallback, useState} from "react";

type Props = {
    /**
     * The text to copy to clipboard when button is clicked
     */
    textToCopy: string;
    /**
     * Optional text to display on button before click. Defaults to "Copy"
     */
    defaultLabel?: string;
    /**
     * Optional text to display on button after click. Defaults to "Copied"
     */
    copiedLabel?: string;
};

/**
 * A button that copies text to clipboard when clicked and updates its label
 * to indicate the text was copied.
 */
export const CopyButton = ({
    textToCopy,
    defaultLabel = "Copy",
    copiedLabel = "Copied",
}: Props): React.ReactElement => {
    const [isCopied, setIsCopied] = useState(false);

    const handleClick = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
        } catch (error) {
            // If clipboard API fails, fall back to older method
            const textarea = document.createElement("textarea");
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setIsCopied(true);
        }
    }, [textToCopy]);

    return (
        <Button onClick={handleClick}>
            {isCopied ? copiedLabel : defaultLabel}
        </Button>
    );
};
