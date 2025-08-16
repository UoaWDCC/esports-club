import Link from "next/link";
import { cn } from "@libs/utils/class";

interface BlockNavigationProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const BlockNavigation = ({ href, children, className = "" }: BlockNavigationProps) => {
    return (
        <Link
            href={href}
            className={cn(
                "h-24 w-full rounded bg-neutral-800 p-4 text-xl hover:bg-neutral-700",
                className,
            )}
        >
            {children}
        </Link>
    );
};

export default BlockNavigation;
