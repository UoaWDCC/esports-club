import { Tomorrow } from "next/font/google";
import Image from "next/image";
import { cn } from "@libs/utils";
import Button from "@ui/button/Button";

const tomorrow = Tomorrow({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-tomorrow",
});

const Carousel = ({ children }: React.HTMLProps<HTMLDivElement>) => {
    return (
        <div className="mt-0 flex w-full flex-col items-center justify-center">
            <div className="flex-col">
                <span className="flex flex-row items-center">
                    <Image
                        src="/images/carousel/EventCalenderIcon.svg"
                        alt="calender icon"
                        width={20}
                        height={20}
                    />
                    <h4
                        className={cn(
                            "p-2 text-center text-[20px] font-bold text-[#4B63FF]",
                            tomorrow.className,
                        )}
                    >
                        Events
                    </h4>
                </span>
                <div className="justify-cente grid w-full grid-cols-3 gap-x-[24px]">{children}</div>
                <hr className="mb-5 w-full text-[#4B63FF]" />
            </div>

            <Button href="/temp" variant={{ style: "home_grey" }}>
                See past events
            </Button>
        </div>
    );
};

export default Carousel;
