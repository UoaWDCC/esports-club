"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { cn } from "@libs/utils/class";
import { createPortal } from "react-dom";

// Dialog Context
interface DialogContextType {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
    children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <DialogContext.Provider value={{ isOpen, open, close }}>{children}</DialogContext.Provider>
    );
};

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
};

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    asChild?: boolean;
}

export const DialogTrigger = ({ children, asChild = false, ...props }: DialogTriggerProps) => {
    const { open } = useDialog();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        open();
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: (e: any) => {
                e.preventDefault();
                open();
            },
        } as any);
    }

    return (
        <button onClick={open} className={cn("cursor-pointer", props.className)}>
            {children}
        </button>
    );
};

// Dialog Content Component
interface DialogContentProps {
    children: ReactNode;
    className?: string;
}

export const DialogContent = ({ children, className = "" }: DialogContentProps) => {
    const { isOpen, close } = useDialog();

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70" onClick={close} />

            {/* Dialog */}
            <div
                className={cn(
                    "bg-muted-background relative w-full max-w-md rounded-lg p-3 shadow-lg",
                    className,
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
};

// Dialog Body Component
export const DialogBody = ({ children }: { children: ReactNode }) => (
    <div className="px-6 py-4">{children}</div>
);

// Dialog Close Button Component
export const DialogClose = ({ children }: { children: ReactNode }) => {
    const { close } = useDialog();

    return (
        <button
            onClick={close}
            className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-800"
        >
            {children}
        </button>
    );
};
