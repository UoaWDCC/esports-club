import React, { Children, HTMLProps, ReactNode } from "react";
import Image from "next/image";
import Button from "@ui/button/Button";

interface carouselProps extends React.HTMLProps<HTMLDivElement> {}
export const Carousel = ({ children, ...props }: carouselProps) => {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <div className="w-7/10 flex-col">
                <span className="flex flex-row items-center">
                    <Image
                        src="/images/carousel/EventCalenderIcon.svg"
                        alt="calender icon"
                        width={20}
                        height={20}
                    />
                    <h4 className="p-2 text-center font-bold text-[#4B63FF]">Events</h4>
                </span>
                <div className="justify-cente grid w-full grid-cols-3 gap-x-5">{children}</div>
                <hr className="w-full text-[#4B63FF]" />
            </div>
            <a
                href="/unknown"
                className="rounded border border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
                <button>See past events</button>
            </a>
        </div>
    );
};
