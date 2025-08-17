"use client";

import { ThemeName } from "@providers/theme/data/themes";
import { useTheme } from "@providers/theme/ThemeProvider";

import { BlockContent } from "@/components/BlockNavigation";

export function ClientThemePage() {
    return (
        <div className="flex h-[2000px] flex-col gap-12">
            <h1 className="text-4xl">Themes</h1>
            <h3 className="text-xl">Color Presents</h3>

            <div className="grid grid-cols-3 gap-3">
                <ThemePresentBlock theme="default" />
                <ThemePresentBlock theme="light" />
                <ThemePresentBlock theme="nature" />
                <ThemePresentBlock theme="cappuccino" />
                <ThemePresentBlock theme="highContrast" />
            </div>
        </div>
    );
}

export const ThemePresentBlock = ({ theme }: { theme: ThemeName }) => {
    const { updateTheme, reset } = useTheme();

    const handleTheme = (theme: ThemeName) => {
        if (theme === "default") reset();
        updateTheme(theme);
    };

    return (
        <BlockContent className="cursor-pointer" onClick={() => handleTheme(theme)}>
            <p>{theme}</p>
        </BlockContent>
    );
};
