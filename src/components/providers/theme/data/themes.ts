import { z } from "zod";

// Zod schema for theme validation with defaults
export const ThemeColorsSchema = z.object({
    cta: z.string().default("#978ffe"),
    muted: z.string().default("#afafaf"),
    foreground: z.string().default("#ffffff"),
    border: z.string().default("#616161"),
    btnHover: z.string().default("#3a3a40"),
    ctaForeground: z.string().default("#020019"),
    background: z.string().default("#111111"),
    mutedBackground: z.string().default("#1f1f1f"),
    navigation: z.string().default("#262531"),
});

// Schema for the entire themes object
export const ThemesSchema = z.record(z.string(), ThemeColorsSchema);

export type ThemeColors = z.infer<typeof ThemeColorsSchema>;

export const themes: Record<string, ThemeColors> = {
    default: {
        cta: "#978ffe",
        muted: "#afafaf",
        foreground: "#ffffff",
        border: "#616161",
        btnHover: "#3a3a40",
        ctaForeground: "#020019",
        background: "#111111",
        mutedBackground: "#1f1f1f",
        navigation: "#262531",
    },
    light: {
        cta: "#978ffe",
        muted: "#b0b0b0",
        foreground: "#222222",
        border: "#d3d3d3",
        btnHover: "#a78ffe",
        ctaForeground: "#ffffff",
        background: "#f8f9fa",
        mutedBackground: "#e0e0e0",
        navigation: "#ffffff",
    },
    // thanks gpt
    nature: {
        cta: "#4caf50",
        muted: "#9e9e9e",
        foreground: "#263238",
        border: "#6d4c41",
        btnHover: "#81c784",
        ctaForeground: "#ffffff",
        background: "#f1f8e9",
        mutedBackground: "#dcedc8",
        navigation: "#a5d6a7",
    },
    cappuccino: {
        cta: "#a67c52", // warm coffee accent
        muted: "#bfb1a8", // soft muted text
        foreground: "#3e2f2f", // dark coffee text
        border: "#8c6d5f", // medium brown borders
        btnHover: "#c19e88", // lighter hover accent
        ctaForeground: "#ffffff", // text on CTA
        background: "#f5f0eb", // creamy background
        mutedBackground: "#e6ddd4", // soft muted background
        navigation: "#d2bca3", // warm navigation bar
    },
    highContrast: {
        cta: "#ffffff", // white call-to-action
        muted: "#bfbfbf", // light gray for muted text
        foreground: "#ffffff", // primary text in white
        border: "#ffffff", // white borders
        btnHover: "#e0e0e0", // slightly darker hover
        ctaForeground: "#000000", // black text on white CTA
        background: "#000000", // pure black background
        mutedBackground: "#1a1a1a", // very dark gray for muted areas
        navigation: "#ffffff", // white nav
    },
};

export type ThemeName = keyof typeof themes;

export const themeNames: ThemeName[] = Object.keys(themes) as ThemeName[];

export const validateTheme = (themeData: unknown) => {
    const { data: themeobj, success } = ThemeColorsSchema.safeParse(themeData);
    return { themeobj, success };
};

export const getThemeWithDefaults = (themeName: string): ThemeColors => {
    const theme = themes[themeName];

    const { success, themeobj } = validateTheme(theme);

    if (success) {
        return themeobj as ThemeColors;
    }

    return themes["default"] as ThemeColors;
};
