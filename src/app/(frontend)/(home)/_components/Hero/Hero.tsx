import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    SiDiscord,
    SiInstagram,
    SiTiktok,
    SiTwitch,
    SiX,
    SiXiaohongshu,
} from "@icons-pack/react-simple-icons";

export function Hero() {
    return (
        <>
            <section className="responsive-fullwidth relative flex h-full w-full flex-col justify-between pt-12">
                <Image
                    src="/assets/landing/hero-auec.png"
                    width={485}
                    height={376}
                    alt="Hero Image"
                    className="w-fill"
                />
                <div className="flex gap-3 place-self-end">
                    <SocialButton href="https://discord.com/invite/ZmcUREd?fbclid=IwAR25TRI5UlvA8VoWxtSXc2qpLdGFlFPZaV13KhFnaZ7gpLw7YW-WuIi6g70">
                        <SiDiscord className="text-foreground" />
                    </SocialButton>
                    <SocialButton href="https://instagram.com/aucklanduniesports">
                        <SiInstagram className="text-foreground" />
                    </SocialButton>
                    <SocialButton href="https://tiktok.com/@aucklanduniesports">
                        <SiTiktok className="text-foreground" />
                    </SocialButton>
                    <SocialButton href="https://www.twitch.tv/aucklanduniesports">
                        <SiTwitch className="text-foreground" />
                    </SocialButton>
                    <SocialButton href="https://www.xiaohongshu.com/user/profile/67d52f2a000000000e01c484">
                        <SiXiaohongshu className="text-foreground" />
                    </SocialButton>
                </div>
            </section>
        </>
    );
}

const SocialButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return (
        <Link
            href={href}
            className="bg-background hover:bg-muted-background flex aspect-square size-16 items-center justify-center rounded-full"
        >
            {children}
        </Link>
    );
};
