import React, { HTMLAttributes } from "react";
import { cookies } from "next/headers";

import { ThemeColorsSchema } from "./data/themes";

export const ThemeBody = async ({ children, ...props }: HTMLAttributes<HTMLBodyElement>) => {
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get("theme");

    try {
        if (!themeCookie?.value) {
            return <body {...props}>{children}</body>;
        }

        const { data: theme, success } = ThemeColorsSchema.safeParse(
            JSON.parse(themeCookie?.value),
        );

        if (!success) {
            return <body {...props}>{children}</body>;
        }

        const themeStyles = {
            "--color-cta": theme.cta,
            "--color-muted": theme.muted,
            "--color-foreground": theme.foreground,
            "--color-border": theme.border,
            "--color-btn-hover": theme.btnHover,
            "--color-cta-foreground": theme.ctaForeground,
            "--color-background": theme.background,
            "--color-muted-background": theme.mutedBackground,
            "--color-navigation": theme.navigation,
        } as React.CSSProperties;

        return (
            <body {...props} style={themeStyles}>
                {children}
            </body>
        );
    } catch {
        return <body {...props}>{children}</body>;
    }
};
