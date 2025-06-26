"use client";

import { createContext, Fragment, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { easeOutExpo } from "@libs/motion/ease";
import { ROUTE_SYSTEM } from "@libs/routes";
import { Route } from "@libs/routes/index.generated";
import { cn } from "@libs/utils";
import { GitBranch } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

import { useLocalStorage } from "@/hooks/useLocalStoage";

type DevRouteSetting = {
    open: boolean;
    initialOpen: boolean;
    autoClose: boolean;
    setOpen: (open: boolean) => void;
    setInitialOpen: (initialOpen: boolean) => void;
    setAutoClose: (autoClose: boolean) => void;
};

const RouteContext = createContext({} as DevRouteSetting);

const useDevSetting = () => {
    const context = useContext(RouteContext);
    if (context === null) {
        throw new Error("useDevSetting must be used within a RouteContext Provider");
    }
    return context;
};

export function RoutingDevTools() {
    const [autoClose, setAutoClose] = useLocalStorage("DEV-AUTOCLOSE", true);
    const [initialOpen, setInitialOpen] = useLocalStorage("DEV-INITIALOPEN", false);

    const [open, setOpen] = useState(initialOpen);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (process.env.NODE_ENV !== "development") return null;

    if (!mounted) {
        return null;
    }

    return createPortal(
        <RouteContext.Provider
            value={{
                open,
                initialOpen,
                autoClose,
                setOpen,
                setInitialOpen,
                setAutoClose,
            }}
        >
            {/* toggle button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-16 left-5 z-999 flex cursor-pointer items-center justify-center gap-2 rounded-full border border-neutral-600 bg-black/80 p-1 px-4 font-[Geist] text-white outline outline-black transition-colors select-none hover:bg-black/60"
            >
                <GitBranch size={16} />
                <p>Routes</p>
            </button>
            <AnimatePresence mode="wait">
                {open && (
                    <>
                        <motion.div
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed top-0 left-0 z-50 flex h-dvh w-dvw items-center justify-center bg-black/20"
                        />
                        <RouteSheet />
                    </>
                )}
            </AnimatePresence>
        </RouteContext.Provider>,
        document.body,
    );
}

const RouteSheet = () => {
    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: easeOutExpo }}
            className="fixed top-0 left-0 z-50 flex h-dvh w-[450px] flex-col border-r border-neutral-900 bg-black font-[Geist] font-light text-white"
        >
            <DevRouteSetting />
            {ROUTE_SYSTEM.map((section) => (
                <Fragment key={section.name}>
                    <RouteSection>{section.name}</RouteSection>
                    {section.routes.map((route) => (
                        <RouteNavigation key={route.url} {...route} />
                    ))}
                </Fragment>
            ))}
        </motion.div>
    );
};

const DevRouteSetting = () => {
    const { autoClose, initialOpen, setAutoClose, setInitialOpen } = useContext(RouteContext);
    return (
        <div className="flex w-full items-center gap-4 border-y border-neutral-900 p-4">
            <p>initial open</p>
            <div
                onClick={() => setInitialOpen(!initialOpen)}
                className={cn(
                    "flex h-4 w-8 cursor-pointer rounded-full transition-colors",
                    initialOpen ? "justify-end bg-green-500" : "justify-start bg-red-500",
                )}
            >
                <motion.div
                    layout
                    transition={{ duration: 0.5, ease: easeOutExpo }}
                    className="aspect-square h-full scale-75 rounded-full bg-white"
                />
            </div>
            <p>auto close</p>
            <div
                onClick={() => setAutoClose(!autoClose)}
                className={cn(
                    "flex h-4 w-8 cursor-pointer rounded-full transition-colors",
                    autoClose ? "justify-end bg-green-500" : "justify-start bg-red-500",
                )}
            >
                <motion.div
                    layout
                    transition={{ duration: 0.5, ease: easeOutExpo }}
                    className="aspect-square h-full scale-75 rounded-full bg-white"
                />
            </div>
        </div>
    );
};

const RouteSection = ({ children }: { children: ReactNode }) => {
    return (
        <p className="w-full border-y border-l-4 border-neutral-900 border-l-white bg-white/10 p-4">
            {children}
        </p>
    );
};

const RouteNavigation = (route: Route) => {
    const { autoClose, setOpen } = useDevSetting();

    return (
        <Link
            href={route.url}
            onClick={() => autoClose && setOpen(false)}
            className="flex w-full justify-between border-y border-neutral-900 p-4 py-2 hover:bg-white/20"
        >
            <p>{route.url}</p>
            <p className="text-white/50">{route.name}</p>
        </Link>
    );
};
