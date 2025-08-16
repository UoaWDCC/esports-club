import { ReactNode } from "react";
import Link from "next/link";
import { getSession } from "@libs/auth/auth";
import { NavigationGrouping } from "@libs/routes";
import { cn } from "@libs/utils/class";
import { LogOut } from "lucide-react";

export async function DashboardLayout({
    children,
    navigationGrouping,
}: {
    children: ReactNode;
    navigationGrouping: NavigationGrouping[];
}) {
    const {
        user: { role, email, name },
    } = await getSession();

    return (
        <div className="flex flex-col">
            <div className="flex gap-6">
                <nav className="bg-muted-background sticky top-0 flex h-dvh min-w-[400px] flex-col gap-6 overflow-y-auto p-6">
                    {/* nav heading */}
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-1">
                            <p>{email}</p>
                            <p>{name}</p>
                            {role === "staff" && (
                                <p className="text-cta w-min rounded-sm bg-[#282548] px-3">Staff</p>
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
                        <ListNavigation key={i} grouping={grouping} role={role} />
                    ))}
                </nav>
                {/* nav footer */}
                <div className="flex w-full justify-center pt-12 pr-12">
                    <main className="w-full max-w-[1440px]">{children}</main>
                </div>
            </div>
        </div>
    );
}

const ListNavigation = ({
    grouping,
    role,
}: {
    role?: string | null;
    grouping: NavigationGrouping;
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
                            "hover:bg-btn-hover flex items-center gap-3 rounded-sm p-1.5 px-3",
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
