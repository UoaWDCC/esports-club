import Link from "next/link";
import { staffNavigation } from "@libs/navigation/staff";

export default async function StaffPage() {
    return (
        <div className="grid grid-cols-3 gap-3">
            {staffNavigation.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className="h-36 w-full rounded bg-neutral-800 p-3 hover:bg-neutral-700"
                >
                    {route.name}
                </Link>
            ))}
        </div>
    );
}
