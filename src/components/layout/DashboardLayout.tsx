import { ReactNode } from "react";
import Link from "next/link";

export function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col">
            <div className="flex gap-6 *:pt-24">
                <nav className="sticky top-0 flex h-full w-[300px] flex-col gap-3 overflow-y-auto pl-12">
                    <Link href="/" className="rounded p-0.5 px-2 hover:bg-neutral-800">
                        Back home
                    </Link>
                    <Link
                        href="/profile/membership"
                        className="mt-6 rounded p-0.5 px-2 hover:bg-neutral-800"
                    >
                        Profile
                    </Link>
                    <Link
                        href="/profile/membership"
                        className="rounded p-0.5 px-2 hover:bg-neutral-800"
                    >
                        Membership
                    </Link>
                    <Link
                        href="/profile/invoice"
                        className="rounded p-0.5 px-2 hover:bg-neutral-800"
                    >
                        Invoices
                    </Link>
                </nav>
                <div className="flex w-full justify-center pr-12">
                    <main className="w-full max-w-[1440px]">{children}</main>
                </div>
            </div>
        </div>
    );
}
