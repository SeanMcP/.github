import React, {useState} from "react";
import Button from "@khanacademy/wonder-blocks-button";

export type CopyButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick" | "children"> & {
    /** The text to copy to clipboard when the button is clicked */
    text: string;
};

/**
 * A button that copies the provided text to the clipboard when clicked.
 * The label changes from "Copy" to "Copied" after selection.
 */
const CopyButton = ({text, ...buttonProps}: CopyButtonProps): React.ReactElement => {
    const [copied, setCopied] = useState(false);

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Failed to copy text to clipboard", error);
        }
    };

    return (
        <Button onClick={handleClick} {...buttonProps}>
            {copied ? "Copied" : "Copy"}
        </Button>
    );
};

export default CopyButton;
