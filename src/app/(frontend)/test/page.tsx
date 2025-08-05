import { ReactNode } from "react";
import Link from "next/link";

export default function TestNavigation() {
    return (
        <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-6 bg-white text-black">
            <h1 className="text-3xl">Emailing UI</h1>
            <div className="flex h-min w-min gap-6">
                <NavBlock href="test/email/verification">verification-email</NavBlock>
                <NavBlock href="test/memberApproval">memberApproval</NavBlock>
            </div>
        </div>
    );
}

const NavBlock = ({ children, href = "/" }: { children: ReactNode; href?: string }) => {
    return (
        <Link
            href={href}
            className="rounded-xl border border-neutral-400 p-6 whitespace-nowrap text-black transition-colors hover:bg-neutral-100"
        >
            {children}
        </Link>
    );
};
