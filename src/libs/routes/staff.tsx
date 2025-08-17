// staff page navigation for `/staff` dashboard

import {
    BarChart2,
    DollarSign,
    FileText,
    LayoutDashboard,
    List,
    Palette,
    UserRoundCheck,
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
            {
                name: "Themes",
                href: "/profile/themes",
                icon: <Palette size={20} strokeWidth={2} />,
            },
        ],
    },
    {
        label: "Member",
        links: [
            {
                name: "Members",
                href: "/staff/members",
                icon: <UserSearch size={20} />,
            },
        ],
    },
    {
        label: "Membership",
        links: [
            {
                name: "Approve Membership",
                href: "/staff/members-approval",
                icon: <UserRoundCheck size={20} />,
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
        label: "Admin Only",
        links: [
            {
                name: "Member CSV upload",
                href: "/staff/memberCSVUpload",
                icon: <FileText size={20} />,
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
