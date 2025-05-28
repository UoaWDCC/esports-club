import { GendersOptions, ProfileDTOType, YearOfStudyOptions } from "@libs/db/types/profile";

export const parseProfile = (raw: string[]) => {
    const fullName: string = raw[6];
    if (fullName == null) {
        return;
    }

    const firstName = fullName.split(" ").slice(0, -1).join(" ");
    const lastName = fullName.split(" ").slice(-1).join(" ");

    const prevMemRaw = raw[3];
    let previousMember = false;
    if (prevMemRaw == "Yes") {
        previousMember = true;
    }

    const yearOfStudy = raw[12] as YearOfStudyOptions;

    const gender = raw[10]?.toLowerCase() as GendersOptions;

    const newMember: ProfileDTOType = {
        firstName: firstName,
        lastName: lastName,
        email: raw[7],
        universityId: String(raw[8]),
        previousMember: previousMember,
        yearOfStudy: yearOfStudy,
        gender: gender,
        ethnicity: raw[11],
        currentStudy: raw[13],
    };

    return newMember;
};
