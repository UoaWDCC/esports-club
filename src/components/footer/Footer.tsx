import Image from "next/image";
import Link from "next/link";
import { SiDiscord, SiInstagram, SiTiktok, SiTwitch, SiX } from "@icons-pack/react-simple-icons";

import { HeroDivider } from "@/app/(frontend)/(home)/_components/HeroDivider";
import AUECLogo from "@/components/assets/image/AUEC.png";

export const Footer = () => {
    return (
        <footer className="content-container text-background p-8">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col justify-between gap-6 md:flex-row">
                    <div className="flex flex-col justify-between gap-5">
                        <Image src={AUECLogo} width={200} height={200} alt={"AUEC logo"} />
                        {/* hardcoded for milestone gaf */}
                        <ul className="flex justify-between">
                            <li className="text-foreground">
                                <Link href="https://discord.com/invite/ZmcUREd?fbclid=IwAR25TRI5UlvA8VoWxtSXc2qpLdGFlFPZaV13KhFnaZ7gpLw7YW-WuIi6g70">
                                    <SiDiscord />
                                </Link>
                            </li>
                            <li className="text-foreground">
                                <Link href="https://instagram.com/aucklanduniesports">
                                    <SiInstagram />
                                </Link>
                            </li>
                            <li className="text-foreground">
                                <Link href="https://instagram.com/aucklanduniesports">
                                    <SiTiktok />
                                </Link>
                            </li>
                            <li className="text-foreground">
                                <Link href="https://instagram.com/aucklanduniesports">
                                    <SiTwitch />
                                </Link>
                            </li>
                            <li className="text-foreground">
                                <Link href="https://x.com/akluniesports">
                                    <SiX />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-foreground text-2xl">Navigation</p>
                        <ul className="text-muted">
                            <li>
                                <Link href={"/"}>Home page</Link>
                            </li>
                            <li>
                                <Link href={"events"}>Events</Link>
                            </li>
                            <li>
                                <Link href={"about"}>About</Link>
                            </li>
                            <li>
                                <Link href={"sponsors"}>Sponsorships</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="text-muted flex flex-col">
                        <p className="text-foreground text-2xl">Contact</p>
                        <p>Address: Level 1/11 Symonds Street</p>
                        <p>Email: uoaesports@gmail.com</p>
                    </div>
                </div>
                <HeroDivider />
                <div className="text-muted flex justify-between">
                    <p>2026 © Auckland University Esports Club</p>
                    <div className="flex gap-10">
                        <Link href={"/policies/privacy-policy"}>Privacy Policy</Link>
                        <Link href="/policiies/terms-and-services">Terms and Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
