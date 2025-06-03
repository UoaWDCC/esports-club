import React from "react";
import Image from "next/image";

interface carouselEventProps extends React.HTMLProps<HTMLDivElement> {
    day: string;
    imageSrc: string;
}

const CarouselEvent = ({ day, imageSrc, ...props }: carouselEventProps) => {
    return (
        <div className="w-226px pb-[24px] text-[16px]">
            <Image src={imageSrc} alt="Image of event" width={279} height={171} />
            <h4 className="font-[tomorrow] font-bold">{day}</h4>
            <div className="leading-[0.95] text-[#AFAFAF]"> {props.children}</div>
        </div>
    );
};

export default CarouselEvent;
