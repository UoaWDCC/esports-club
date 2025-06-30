import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// tailwind classname merging function
// conflicting classname on the right will override

/**
 * this function is used to merge tailwind classname where conflicting classname on the right will override
 * @param inputs classnames
 * @returns merged classname
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
