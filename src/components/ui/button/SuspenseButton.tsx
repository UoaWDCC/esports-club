import React from "react";

import Button, { ButtonProps } from "./Button";

type SuspenseButtonProps = ButtonProps & { isLoading: boolean };

const SuspenseButton = ({ isLoading, ...props }: SuspenseButtonProps) => {
    return (
        <Button {...props} disabled={isLoading}>
            {isLoading ? "Loading..." : props.children}
        </Button>
    );
};

export default SuspenseButton;
