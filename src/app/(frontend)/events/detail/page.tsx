import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { PageLayout } from "@/components/layout/PageLayout";

export default function page() {
    const imageUrl = "/assets/landing/valorant-watch-party.png";
    const eventTitle = "Valorant Watch Party";
    const description = "ALOT OF DESCRIPTION";
    const link = "";
    return (
        <PageLayout>
            <section className="flex flex-col items-center justify-center gap-10 px-6 py-16 md:flex-row md:px-20">
                {/* Left: Image */}
                <div className="w-full flex-shrink-0 md:w-1/3">
                    <Image
                        src={imageUrl}
                        alt="Event Image"
                        className="h-auto w-full rounded-xl object-cover"
                        width={100}
                        height={100}
                    ></Image>
                </div>

                {/* Right: Info */}
                <div className="w-full space-y-6 text-center md:w-2/3 md:text-left">
                    <h1 className="text-4xl font-bold md:text-5xl">{eventTitle}</h1>
                    <p className="mx-auto max-w-xl leading-relaxed text-gray-300 md:mx-0">
                        {description}
                    </p>

                    <Link href={""}>Signup</Link>
                </div>
            </section>
            <h1 className="text-7xl font-medium"></h1>
        </PageLayout>
    );
}
