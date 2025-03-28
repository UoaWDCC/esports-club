import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "@/libs/utils";

type CommonProps = {
    className?: string;
    children: ReactNode;
    variant?: VariantProps<typeof button>;
};

// define types for each version
type ButtonVersion = CommonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
    };

type LinkVersion = CommonProps &
    LinkProps & {
        target?: React.HTMLAttributeAnchorTarget;
        rel?: string;
    };

// full definition, switch type based on props
type ButtonProps = (ButtonVersion | LinkVersion) & CommonProps;

const button = tv({
    base: "relative flex cursor-pointer justify-center gap-2 rounded-xl border-2 px-6 py-3.5 font-bold transition-[filter] select-none",
    variants: {
        style: {
            cta: "bg-purple border-purple-border",
            solid: "bg-gray-border border-none",
            outline: "border-gray-border",
            google: "bg-white text-black",
        },
    },
    defaultVariants: {},
});

// is link if has href
const isLink = (props: ButtonProps) => {
    return props?.href !== undefined;
};

export const Button = ({ ...props }: ButtonProps) => {
    if (isLink(props)) {
        const newTab = (props.href as string).startsWith("http") ? "_blank" : undefined;

        return (
            <Link className={cn(button(props.variant))} target={newTab} href={props.href}>
                {props.children}
            </Link>
        );
    }

    return <button className={cn(button(props.variant), props.className)}>{props.children}</button>;
};

export default Button;
