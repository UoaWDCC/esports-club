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
                    <Link href="/tournaments">TOURNAMENTS</Link>
                    <Link href="/events">EVENTS</Link>
                    <Link href="/faqs">FAQs</Link>
                </div>
            </div>
            <div className="flex h-12 gap-6">
                <Button variant={{ style: "solid" }} href="/auth/sign-in">
                    LOG IN
                </Button>
                <Button href="/auth/sign-up">SIGN UP</Button>
            </div>
        </nav>
    );
}
