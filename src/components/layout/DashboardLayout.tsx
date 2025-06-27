import { ReactNode } from "react";
import Link from "next/link";

export function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex gap-6 p-12 pt-24">
            <nav className="flex h-dvh w-[300px] flex-col gap-3 overflow-y-auto">
                <Link href="/profile">Account</Link>
                <Link href="/profile/membership">Membership</Link>
                <Link href="/profile/invoice">Invoices</Link>
            </nav>
            <div className="flex w-full justify-center">
                <main className="w-full max-w-[1200px]">{children}</main>
            </div>
        </div>
    );
}
