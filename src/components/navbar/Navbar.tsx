import React from "react";
import Image from "next/image";
import Link from "next/link";

import AUECLogo from "@/components/assets/image/AUEC.png";

import { Button } from "../button/Button";

export function Navbar() {
    return (
        <nav className="content-container bg-navigation itc flex w-full items-center justify-between rounded-lg px-6 py-2">
            <Link href="/" className="w-24">
                <Image
                    src={AUECLogo}
                    width={AUECLogo.width}
                    height={AUECLogo.height}
                    alt="AUEC logo"
                />
            </Link>
            <div className="flex items-center gap-6">
                <Link href="/events">Events</Link>
                <Link href="/about">About</Link>
                <Link href="/events">Sponsors</Link>
                <Button href="/auth/sign-in" variant={{ style: "cta" }}>
                    LOGIN
                </Button>
            </div>
        </nav>
    );
}
