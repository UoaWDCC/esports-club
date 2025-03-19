import type { Metadata } from "next";

import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
        </html>
    );
}
