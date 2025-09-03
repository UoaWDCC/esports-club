import { cn } from "@libs/utils/class";
import { HTMLAttributes } from "react";

interface TagProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
}

export const Tags = ({ label = "Tag", className, ...props }: TagProps) => {
    return (
        <div {...props} className={cn("border-border rounded-full border px-3", className)}>
            {label}
        </div>
    );
};