// profile navigation for `/profile` dashboard

import {
    FileText,
    LayoutDashboard,
    List,
    ListCheck,
    Palette,
    ShieldQuestion,
    Trophy,
    User,
    Users,
} from "lucide-react";

import { NavigationGrouping } from ".";

export const profileNavigation: NavigationGrouping[] = [
    {
        links: [
            {
                name: "Dashboard",
                href: "/profile",
                icon: <LayoutDashboard size={20} strokeWidth={2} />,
            },
            {
                name: "Themes",
                href: "/profile/themes",
                icon: <Palette size={20} strokeWidth={2} />,
            },
        ],
    },
    {
        label: "Profile",
        links: [
            {
                name: "My Account",
                href: "/profile/account",
                icon: <User size={20} strokeWidth={2} />,
            },
            {
                name: "Membership",
                href: "/profile/membership",
                icon: <List size={20} strokeWidth={2} />,
            },
            {
                name: "Invoice",
                href: "/profile/invoice",
                icon: <FileText size={20} strokeWidth={2} />,
            },
        ],
    },
    {
        label: "Events",
        links: [
            {
                name: "Team",
                href: "/profile/team",
                icon: <Users size={20} strokeWidth={2} />,
                notImplemented: true,
            },
            {
                name: "Tournament",
                href: "/profile/tournament",
                icon: <Trophy size={20} strokeWidth={2} />,
                notImplemented: true,
            },
            {
                name: "Check in history",
                href: "/profile/check-in",
                icon: <ListCheck size={20} strokeWidth={2} />,
                notImplemented: true,
            },
        ],
    },
    {
        label: "Staff only",
        links: [
            {
                name: "Staff dashboard",
                href: "/staff",
                icon: <ShieldQuestion size={20} strokeWidth={2} />,
            },
        ],
        config: {
            staffOnly: true,
        },
    },
];
