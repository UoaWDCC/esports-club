import Image from "next/image";

export const Carousel = ({ children }: React.HTMLProps<HTMLDivElement>) => {
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
        </div>
    );
};
