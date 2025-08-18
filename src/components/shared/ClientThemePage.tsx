"use client";

import { getThemeWithDefaults, ThemeName, themes } from "@providers/theme/data/themes";
import { useTheme } from "@providers/theme/ThemeProvider";

import { BlockContent } from "@/components/BlockNavigation";

export function ClientThemePage() {
    return (
        <div className="flex h-[2000px] flex-col gap-12">
            <h1 className="text-4xl">Themes</h1>
            <h3 className="text-xl">Color Presents</h3>

            <div className="grid grid-cols-3 gap-3">
                <ThemePresentBlock theme="default" />
                <ThemePresentBlock theme="black out" />
                <ThemePresentBlock theme="light" />
                <ThemePresentBlock theme="nature" />
                <ThemePresentBlock theme="cappuccino" />
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

    const { cta, btnHover, background, border, foreground } = getThemeWithDefaults(theme);

    return (
        <BlockContent
            className="flex h-auto cursor-pointer flex-col gap-3 border-2 bg-neutral-800 text-center text-white outline-2 xl:h-24 xl:flex-row"
            style={{ background, color: foreground, borderColor: border, outlineColor: background }}
            onClick={() => handleTheme(theme)}
        >
            <div
                style={{
                    background: `linear-gradient(135deg, ${background} 15%, ${btnHover} 65%, ${cta} 100%)`,
                    borderColor: border,
                }}
                className="flex aspect-square items-center justify-center rounded-full border"
            >
                <svg
                    className="size-8"
                    width="129"
                    height="98"
                    viewBox="0 0 129 98"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M72.1875 98H41.4688V92.9062H51.7188V77.5312H46.5938V72.4062H21V77.5312H15.875V62.1875H21V67.2812H46.5938V62.1875H41.4688V46.8125H36.375V31.4688H31.25V16.0938H36.375V10.9688H41.4688V31.4688H46.5938V46.8125H51.7188V62.1875H56.8438V77.5312H61.9688V92.9062H72.1875V98ZM31.25 46.8125H26.125V31.4688H31.25V46.8125ZM26.125 62.1875H21V46.8125H26.125V62.1875ZM26.125 98H0.5625V92.9062H10.75V77.5312H15.875V92.9062H26.125V98ZM82.3463 98H77.2213V16.0938H72.1275V10.9688H77.2213V5.84375H82.3463V0.75H87.4713V46.8125H92.5963V51.9375H87.4713V87.7812H92.5963V92.9062H107.94V87.7812H113.065V77.5312H118.19V62.1875H113.065V51.9375H107.94V46.8125H92.5963V41.6875H113.065V46.8125H118.19V51.9375H123.315V62.1875H128.44V77.5312H123.315V87.7812H118.19V92.9062H113.065V98H87.4713V92.9062H82.3463V98Z"
                        style={{ fill: foreground }}
                    />
                </svg>
            </div>
            <p className="font-medium italic">{theme}</p>
        </BlockContent>
    );
};
