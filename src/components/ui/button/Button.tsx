import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "@/libs/utils";

type CommonProps = {
    className?: string;
    children: ReactNode;
    variant?: VariantProps<typeof button>;
};

type LoadingProps =
    | { isLoading?: never; fallback?: never }
    | {
          isLoading: boolean;
          fallback?: ReactNode | string;
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
export type ButtonProps = (ButtonVersion | LinkVersion) & CommonProps & LoadingProps;

const button = tv({
    base: "transition-[filter relative flex cursor-pointer justify-center gap-2 rounded-xl border-2 px-6 py-3.5 font-bold brightness-100 duration-200 select-none",
    variants: {
        style: {
            cta: "bg-purple border-purple-border",
            solid: "bg-gray-border border-none",
            outline: "border-gray-border",
            google: "bg-white text-black",
            home_grey: "border-[#424242] bg-[#1D1D1D] px-[24px] py-[8px] text-[16px]",
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
            <Link
                {...(props as LinkVersion)}
                className={cn(button(props.variant))}
                target={newTab}
                href={props.href}
            >
                {props.children}
            </Link>
        );
    }

    const { isLoading, fallback, ...rest } = props;

    return (
        <button
            {...(rest as ButtonVersion)}
            className={cn(
                button(props.variant),
                isLoading && "pointer-events-none brightness-50",
                props.className,
            )}
        >
            {isLoading && fallback ? fallback : props.children}
        </button>
    );
};

export default Button;
