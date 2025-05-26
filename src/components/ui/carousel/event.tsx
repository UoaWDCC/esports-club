import React from "react";
import Image from "next/image";

interface carouselEventProps extends React.HTMLProps<HTMLDivElement> {
    title: string;
    imageSrc: string;
}

export const CarouselEvent = ({ title, imageSrc, ...props }: carouselEventProps) => {
    return (
        <div className="py-5">
            <Image src={imageSrc} alt="Image of event" width={279} height={171} />
            <h4 className="font-bold">{title}</h4>
            {props.children}
        </div>
    );
};
