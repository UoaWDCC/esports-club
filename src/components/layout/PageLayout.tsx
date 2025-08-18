import { HTMLAttributes } from "react";
import { cn } from "@libs/utils/class";

import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";

export const PageLayout = ({
    children,
    ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) => {
    return (
        <>
            <div
                {...props}
                className={cn(
                    "content-container relative min-h-dvh overflow-x-hidden pt-12",
                    props.className,
                )}
            >
                <main className="flex flex-col gap-y-8 py-12">
                    {children}
                    <Footer />
                </main>
            </div>
        </>
    );
};
