"use client";

import { cn } from "@libs/utils";
import { HTMLMotionProps, motion } from "motion/react";

interface animateTextProps extends HTMLMotionProps<"div"> {
    children: string;
    charStaggerDelay?: number;
    charMoveDuration?: number;
}

export const SlideInText = ({
    children,
    charStaggerDelay = 0.05,
    charMoveDuration = 1,
    ...props
}: animateTextProps) => {
    return (
        <motion.div
            {...props}
            className={cn("relative", props.className)}
            initial="outView"
            whileInView="inView"
        >
            {children.split("").map((char, index) => {
                return (
                    <motion.span
                        className="inline-block"
                        key={index}
                        variants={{
                            outView: {
                                y: "100%",
                                opacity: 0,
                                transition: { duration: 0, delay: 0, ease: "linear" },
                            },
                            inView: {
                                y: "0",
                                opacity: 1,
                                transition: {
                                    ease: "easeOut",
                                    duration: charMoveDuration,
                                    delay: charStaggerDelay * index,
                                },
                            },
                        }}
                    >
                        {char}
                    </motion.span>
                );
            })}
        </motion.div>
    );
};

export default SlideInText;
