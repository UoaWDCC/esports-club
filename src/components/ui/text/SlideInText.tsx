'use client'
import { motion } from "motion/react"
interface animateTextProps {
    children: string;
    className?: string;
    charStaggerDelay?: number;
    charMoveDuration?: number;
}
export const SlideInText = ({ children, charStaggerDelay = 0.05, charMoveDuration = 0.2 }: animateTextProps) => {

    return (<motion.div className="relative"
        initial="outView"
        whileInView="inView"
        viewport={{ amount: 0 }} // To change depending on how far the people should scroll before 
    >
        {children.split("").map((char, index) => {
            return (<motion.span className="inline-block" key={index}
                variants={{
                    outView: { y: "100%", opacity: 0, transition: { duration: 0, delay: 0 } },
                    inView: { y: "0", opacity: 1, transition: { duration: charMoveDuration, delay: charStaggerDelay * index } }
                }}

            >{char}</motion.span>)
        })}
    </motion.div>)
}

export default SlideInText;

