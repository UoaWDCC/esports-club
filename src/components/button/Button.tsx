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
    base: "relative flex cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-2 whitespace-nowrap brightness-100 transition duration-200 select-none disabled:cursor-default disabled:bg-neutral-900 disabled:text-white/50",
    variants: {
        style: {
            cta: "bg-violet-600 hover:bg-violet-800",
            google: "bg-white text-black hover:bg-neutral-200",
            primary: "border-pink-border bg-pink text-white",
            secondary: "border-purple-border bg-purple-button text-white",
        },
    },
    defaultVariants: {
        style: "cta",
    },
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
