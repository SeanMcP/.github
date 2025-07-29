import {css, StyleSheet} from "aphrodite";
import * as React from "react";

import Button from "@khanacademy/wonder-blocks-button";

type Props = {
    textToCopy: string;
};

const CopyButton = ({textToCopy}: Props) => {
    const [copied, setCopied] = React.useState(false);

    const handleClick = React.useCallback(() => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
    }, [textToCopy]);

    return (
        <Button style={styles.button} onClick={handleClick}>
            {copied ? "Copied" : "Copy"}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 160,
    },
});

export default CopyButton;
