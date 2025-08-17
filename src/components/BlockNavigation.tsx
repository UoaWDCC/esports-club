import { HTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@libs/utils/class";

interface BlockNavigationProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

interface BlockProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export const BlockNavigation = ({ href, children, className = "" }: BlockNavigationProps) => {
    return (
        <Link
            href={href}
            className={cn(
                "bg-muted-background h-24 w-full rounded p-4 text-xl hover:brightness-50",
                className,
            )}
        >
            {children}
        </Link>
    );
};

export const BlockContent = ({ children, className = "", ...props }: BlockProps) => {
    return (
        <div
            {...props}
            className={cn(
                "bg-muted-background h-24 w-full rounded p-4 text-xl hover:brightness-90",
                className,
            )}
        >
            {children}
        </div>
    );
};
