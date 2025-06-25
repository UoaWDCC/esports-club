"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { ProfileDTO } from "@libs/types/profile.type";

type ProfileProviderProps = {
    children: ReactNode;
    profile: ProfileDTO;
};

const ProfileContext = createContext({} as ProfileDTO);

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
};

export const ProfileProvider = ({ profile, children }: ProfileProviderProps) => {
    return (
        <ProfileContext.Provider value={{ ...profile } as ProfileDTO}>
            {children}
        </ProfileContext.Provider>
    );
};
