"use client";

import React from "react";
import { useQueryState } from "nuqs";

import { cn } from "@/libs/utils/class";

interface StatusOption {
    value: string;
    label: string;
}

interface StatusProps {
    queryKey: string;
    title: string;
    options: StatusOption[];
    className?: string;
}

export const Status = ({ queryKey, title, options, className }: StatusProps) => {
    const [currentValue, setValue] = useQueryState(queryKey);

    const handleSetState = (value: string) => {
        if (value == currentValue) {
            setValue(null);
            return;
        }
        setValue(value);
    };

    return (
        <div
            className={cn(
                "*:border-border flex gap-2 overflow-hidden *:cursor-pointer *:border *:p-1",
                className,
            )}
        >
            <p className="bg-muted-background !px-3">{title}</p>
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => handleSetState(option.value)}
                    className={cn(
                        "hover:bg-muted-background/50 transition-colors",
                        currentValue === option.value &&
                            "bg-muted-background text-primary-foreground",
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};
