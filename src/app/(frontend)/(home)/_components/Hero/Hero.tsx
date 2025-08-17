import React from "react";
import Image from "next/image";

export function Hero() {
    return (
        <section className="responsive-fullwidth relative h-dvh w-full bg-amber-300">
            <Image
                src="/assets/landing/landing-image.png"
                alt="man at computer"
                fill
                className="z-0 object-fill"
            />
            <div className="relative z-10">
                <p className="w-fill bg-amber-400">gyiitiwti</p>
            </div>
        </section>
    );
}
