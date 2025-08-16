import React from "react";
import Image from "next/image";
import Link from "next/link";
import { XIcon, YoutubeIcon } from "lucide-react";

import logo from "@/components/assets/image/AUECLogo.png";

import { DiscordIcon, FacebookIcon, InstagramIcon, TiktokIcon, TwitchIcon } from "../assets/icon";

export default function Footer() {
    return (
        <footer className="p flex w-full max-w-[1100px] flex-col gap-3 py-12">
            <div className="flex flex-col justify-between md:flex-row">
                <div className="flex flex-col gap-16 md:flex-row">
                    <div className="flex flex-col">
                        <Link href="/tournaments">Tournaments</Link>
                        <Link href="/events">Events</Link>
                        <Link href="faqs">FAQs</Link>
                    </div>
                    <div className="flex flex-col">
                        <Link href="/policies/privacy-policy">Privacy Policy</Link>
                        <Link href="/policies/terms-and-services">Terms and Conditions</Link>
                        <Link href="/cookies-policy">Cookies Policy</Link>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="https://discord.gg/CHjHzvC2G9">
                        <DiscordIcon />
                    </Link>
                    <Link href="https://www.facebook.com/AucklandUniEsportsClub/">
                        <FacebookIcon />
                    </Link>
                    <Link href="https://www.instagram.com/aucklanduniesports/?hl=en">
                        <InstagramIcon />
                    </Link>
                    <Link href="https://www.tiktok.com/@aucklanduniesports">
                        <TiktokIcon />
                    </Link>
                    <Link href="https://www.twitch.tv/aucklanduniesports">
                        <TwitchIcon />
                    </Link>
                </div>
            </div>
            <Image src={logo} width={146} height={146} alt="AUECLogo" />
            <p className="text-gray-400">Copyright © UoA Esports 2025 - all rights reserved.</p>
        </footer>
    );
}
