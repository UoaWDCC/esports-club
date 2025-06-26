import { GendersOptions, ProfileDTO, YearOfStudyOptions } from "@libs/types/profile.type";

export const parseProfile = (raw: string[]) => {
    const fullName: string = raw[6];
    if (fullName == null) {
        return;
    }

    const firstName = fullName.split(" ").slice(0, -1).join(" ");
    const lastName = fullName.split(" ").slice(-1).join(" ");

    const previousMember = raw[3] === "Yes";

    const yearOfStudy = raw[12] as YearOfStudyOptions;

    const gender = raw[10]?.toLowerCase() as GendersOptions;

    const newMember: ProfileDTO = {
        firstName: firstName,
        lastName: lastName,
        email: raw[7],
        university: "null",
        universityId: String(raw[8]),
        previousMember: previousMember,
        yearOfStudy: yearOfStudy,
        gender: gender,
        ethnicity: raw[11],
        currentStudy: raw[13],
        tournamentPasses: 0,
    };

    return newMember;
};
