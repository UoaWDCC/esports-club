import { InputHTMLAttributes } from "react";
import { cn } from "@libs/utils/class";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const InputField = ({ label, ...props }: InputFieldProps) => {
    return (
        <div className="flex w-full flex-col gap-1">
            <label>{label}</label>
            <input
                {...props}
                className={cn(
                    "border-border gap-3 rounded-md border py-3 pr-2 pl-6",
                    props.className,
                )}
            />
        </div>
    );
};
