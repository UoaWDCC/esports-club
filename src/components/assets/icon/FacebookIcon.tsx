import React from "react";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="32" height="32" fill="white" />
        <g clipPath="url(#clip0_1017_307)">
            <path
                d="M22 6H19C17.6739 6 16.4021 6.52678 15.4645 7.46447C14.5268 8.40215 14 9.67392 14 11V14H11V18H14V26H18V18H21L22 14H18V11C18 10.7348 18.1054 10.4804 18.2929 10.2929C18.4804 10.1054 18.7348 10 19 10H22V6Z"
                fill="black"
            />
        </g>
        <defs>
            <clipPath id="clip0_1017_307">
                <rect width="24" height="24" fill="white" transform="translate(4 4)" />
            </clipPath>
        </defs>
    </svg>
);

export { FacebookIcon };
