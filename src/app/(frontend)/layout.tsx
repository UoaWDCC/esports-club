import type { Metadata } from "next";

import "./globals.css";

import localFont from "next/font/local";
import TanstackClientProvider from "@providers/query/TanstackClientProvider";

export const metadata: Metadata = {
    title: { default: "Esports club", template: "%s | Esports club" },
    description:
        "Esports club is dedicated to cultivating a friendly community where individuals can come together through their passion for gaming. We host tournaments for various games, game-themed events, and casual nights to cater for every kind of player.",
    icons: {
        icon: [
            {
                url: "/images/icon.svg",
                href: "/svgs/favicon.svg",
            },
        ],
    },
};

const satoshi = localFont({
    src: [
        { path: "../../../public/fonts/satoshi/Satoshi-Variable.woff2", style: "normal" },
        {
            path: "../../../public/fonts/satoshi/Satoshi-VariableItalic.woff2",
            style: "italic",
            weight: "100 900",
        },
    ],
    variable: "--font-satoshi",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${satoshi.className} antialiased`}>
                <TanstackClientProvider>{children}</TanstackClientProvider>
            </body>
        </html>
    );
}
