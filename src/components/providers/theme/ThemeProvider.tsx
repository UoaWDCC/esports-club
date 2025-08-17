"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { getThemeWithDefaults, ThemeName, themes } from "./data/themes";

interface ThemeContextType {
    theme: ThemeName;
    updateTheme: (theme: ThemeName) => void;
    reset: () => void;
}

const ThemeContext = createContext({} as ThemeContextType);

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: ThemeName;
}

export const ThemeProvider = ({ children, defaultTheme = "default" }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<ThemeName>(defaultTheme);

    const updateTheme = (newTheme: ThemeName) => {
        setTheme(newTheme);

        if (typeof document !== "undefined" && Object.keys(themes).includes(newTheme)) {
            const themeObject = getThemeWithDefaults(newTheme);

            console.log(themeObject);
            Object.entries(themeObject).forEach(([key, value]) => {
                console.log(key);

                document.body.style.setProperty(`--color-${toKebab(key)}`, value);
            });

            document.cookie = `theme=${JSON.stringify(themeObject)}; path=/; max-age=31536000`;
        }
    };

    const reset = () => {
        document.cookie = "theme=; path=/; max-age=0";
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                updateTheme,
                reset,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

// useTheme hook
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};

const toKebab = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
