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
            <div className="relative">
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
                        "mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:outline-none",
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

InputField.displayName = "InputField";
