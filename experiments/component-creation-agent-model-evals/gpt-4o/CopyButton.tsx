import React, {useState} from "react";
import {Button} from "@khanacademy/wonder-blocks-button";

interface CopyButtonProps {
    textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({textToCopy}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    };

    return (
        <Button onClick={handleCopy} disabled={copied}>
            {copied ? "Copied" : "Copy"}
        </Button>
    );
};

export default CopyButton;
