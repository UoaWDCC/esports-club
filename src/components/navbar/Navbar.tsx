import React from "react";
import Image from "next/image";
import Link from "next/link";

import AUECLogo from "@/components/assets/image/AUEC.png";

import { Button } from "../button/Button";

export function Navbar() {
    return (
        <nav className="content-container bg-navigation w-full rounded-lg px-6 py-2">
            <div className="flex justify-between">
                <Link href="/">
                    <Image src={AUECLogo} width={100} height={50} alt={"AUEC logo"} />
                </Link>
                <div className="flex items-center gap-5">
                    <Link href="/events">Events</Link>
                    <Link href="/events">About</Link>

                    <Link href="/events">Sponsors</Link>
                    <Button href="/auth/sign-in" variant={{ style: "cta" }}>
                        LOGIN
                    </Button>
                </div>
            </div>
        </nav>
    );
}
