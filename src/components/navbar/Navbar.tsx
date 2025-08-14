import React from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/components/assets/image/AUECLogo.png";

import { Button } from "../button/Button";

export default function Navbar() {
    return (
        <nav className="flex w-full max-w-[1100px] items-center justify-between">
            <div className="flex items-center gap-12">
                <Image src={logo} width={72} height={72} alt="AUECLogo" />
                <div className="flex gap-12">
                    <Link href="/">HOME</Link>
                    <Link href="/tournaments" className="flex flex-row items-center">
                        TOURNAMENTS
                    </Link>
                    <Link href="/events" className="flex flex-row items-center">
                        EVENTS
                    </Link>
                    <Link href="/faqs">FAQs</Link>
                </div>
            </div>
            <div className="flex h-12 gap-6">
                <Button
                    className="border border-neutral-600"
                    variant={{ style: "solid" }}
                    href="/auth/sign-in"
                >
                    LOG IN
                </Button>
                <Button variant={{ style: "cta" }} href="/auth/sign-up">
                    SIGN UP
                </Button>
            </div>
        </nav>
    );
}
