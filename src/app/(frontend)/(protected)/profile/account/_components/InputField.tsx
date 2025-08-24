import { forwardRef, InputHTMLAttributes, useId } from "react";
import { cn } from "@libs/utils/class";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ error, label, ...props }, ref) => {
        const id = useId();

        return (
            <div className="flex w-full flex-col gap-1">
                <label
                    className={cn("block text-sm font-medium", !!error && "text-red-500")}
                    htmlFor={id}
                >
                    {label}
                </label>
                <input
                    {...props}
                    ref={ref}
                    id={id}
                    className={cn(
                        "border-border gap-3 rounded-md border py-3 pr-2 pl-6",
                        props.className,
                        !!error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                    )}
                />
                {error && (
                    <p className="absolute bottom-0 translate-y-4 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    },
);
