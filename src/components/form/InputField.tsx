import { forwardRef, InputHTMLAttributes, useId } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, ...props }, ref) => {
        const id = useId();

        return (
            <div>
                <label className="block text-sm font-medium" htmlFor={id}>
                    {label}
                </label>
                <input
                    {...props}
                    ref={ref}
                    id={id}
                    className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:outline-none"
                />
            </div>
        );
    },
);

InputField.displayName = "InputField";
