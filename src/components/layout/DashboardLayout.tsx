"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthSession } from "@libs/auth/auth";
import { NavigationGrouping } from "@libs/routes";
import { cn } from "@libs/utils/class";
import { LogOut, Palette } from "lucide-react";

import { DialogContent, DialogProvider, DialogTrigger } from "../dialog";

export function DashboardLayout({
    children,
    session,
    navigationGrouping,
}: {
    children: ReactNode;
    session: AuthSession;
    navigationGrouping: NavigationGrouping[];
}) {
    const {
        user: { role, email, name },
    } = session;
    const pathname = usePathname();

    return (
        <div className="text-foreground flex flex-col">
            <div className="flex gap-6">
                <nav className="bg-muted-background sticky top-0 flex h-dvh min-w-[400px] flex-col overflow-y-auto [scrollbar-gutter:stable_both-edges]">
                    <div className="flex flex-col gap-6 p-6 pb-24">
                        {/* nav heading */}
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <p>{email}</p>
                                <p>{name}</p>
                                {role === "staff" && (
                                    <p className="text-cta bg-cta/50 w-min rounded-sm px-3">
                                        Staff
                                    </p>
                                )}
                            </div>
                            <Link
                                href="/"
                                className="hover:bg-btn-hover aspect-square size-min rounded-xs p-2"
                            >
                                <LogOut size={16} strokeWidth={1} />
                            </Link>
                        </div>
                        <hr className="border-border" />
                        {/* nav routes */}
                        {navigationGrouping.map((grouping, i) => (
                            <ListNavigation
                                key={i}
                                grouping={grouping}
                                role={role}
                                pathname={pathname}
                            />
                        ))}
                    </div>

                    {/* <footer className="bg-muted-background sticky bottom-0 left-0 w-full px-6">
                        <div className="border-border flex justify-end gap-3 border-t py-6">
                            <DialogProvider>
                                <DialogTrigger asChild>
                                    <button className="hover:bg-btn-hover aspect-square size-min rounded-xs p-2">
                                        <Palette size={16} strokeWidth={1} />
                                    </button>
                                </DialogTrigger>
                                <DialogContent>aaa</DialogContent>
                            </DialogProvider>
                        </div>
                    </footer> */}
                </nav>
                <div className="mb-48 flex w-full justify-center pt-12 pr-12">
                    <main className="w-full max-w-[1440px]">{children}</main>
                </div>
            </div>
        </div>
    );
}

const ListNavigation = ({
    grouping,
    role,
    pathname,
}: {
    role?: string | null;
    grouping: NavigationGrouping;
    pathname: string;
}) => {
    if (grouping.config?.staffOnly && role !== "staff") return;

    return (
        <div className="flex flex-col gap-3">
            {grouping.label && <p>{grouping.label}</p>}
            <div className="flex flex-col">
                {grouping.links.map((route) => (
                    <Link
                        key={route.name}
                        href={route.href}
                        className={cn(
                            "hover:bg-btn-hover transition-color flex items-center gap-3 rounded-sm p-1.5 px-3",
                            pathname == route.href && "bg-btn-hover/60",
                            route.notImplemented && "line-through",
                        )}
                    >
                        {route.icon}
                        {route.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};
