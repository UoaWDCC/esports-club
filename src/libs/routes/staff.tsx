// staff page navigation for `/staff` dashboard

import {
    BarChart2,
    DollarSign,
    FileText,
    LayoutDashboard,
    List,
    User,
    UserSearch,
} from "lucide-react";

import { NavigationGrouping } from ".";

export const staffNavigation: NavigationGrouping[] = [
    {
        links: [
            {
                name: "Dashboard",
                href: "/staff",
                icon: <LayoutDashboard size={20} />,
            },
        ],
    },
    {
        label: "Member",
        links: [
            {
                name: "Member Search",
                href: "/staff/member-search",
                icon: <UserSearch size={20} />,
                notImplemented: true,
            },
        ],
    },
    {
        label: "Membership",
        links: [
            {
                name: "User Membership Lookup",
                href: "/staff/membership/user-lookup",
                icon: <User size={20} />,
                notImplemented: true,
            },
            {
                name: "Membership lookup",
                href: "/staff/membership/lookup",
                icon: <List size={20} />,
                notImplemented: true,
            },
            {
                name: "Invoice lookup",
                href: "/staff/membership/invoice-lookup",
                icon: <DollarSign size={20} />,
                notImplemented: true,
            },
        ],
    },
    {
        label: "Membership Control",
        links: [
            {
                name: "Membership types",
                href: "/staff/membership-types",
                icon: <FileText size={20} />,
                notImplemented: true,
            },
        ],
    },
    {
        label: "Misc",
        links: [
            {
                name: "Statistics",
                href: "/staff/misc/statistics",
                icon: <BarChart2 size={20} />,
                notImplemented: true,
            },
        ],
    },
    {
        label: "Moderation",
        links: [
            {
                name: "Audit Logs",
                href: "/staff/moderation/audit-logs",
                icon: <FileText size={20} />,
                notImplemented: true,
            },
        ],
    },
    {
        label: "Profile",
        links: [
            {
                name: "Profile Dashboard",
                href: "/profile",
                icon: <LayoutDashboard size={20} />,
            },
        ],
    },
];
