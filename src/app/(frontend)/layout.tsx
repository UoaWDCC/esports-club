import type { Metadata } from "next";

import "./globals.css";

import { Tomorrow } from "next/font/google";
import localFont from "next/font/local";
import { RoutingDevTools } from "@providers/devtools/DevToolsProvider";
import { TanstackClientProvider } from "@providers/query/TanstackClientProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
    title: { default: "Esports club", template: "%s | Esports club" },
    description:
        "Esports club is dedicated to cultivating a friendly community where individuals can come together through their passion for gaming. We host tournaments for various games, game-themed events, and casual nights to cater for every kind of player.",
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

const switzer = localFont({
    src: [
        { path: "../../../public/fonts/switzer/Switzer-Variable.woff2", style: "normal" },
        {
            path: "../../../public/fonts/switzer/Switzer-VariableItalic.woff2",
            style: "italic",
        },
    ],
    variable: "--font-switzer",
});

const tomorrow = Tomorrow({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-tomorrow",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${satoshi.className} ${tomorrow.style} ${switzer.variable} text-lg antialiased`}
            >
                <RoutingDevTools />
                <TanstackClientProvider>
                    <NuqsAdapter>{children}</NuqsAdapter>
                </TanstackClientProvider>
            </body>
        </html>
    );
}
