import { z } from "zod/v4";

const gendersOptions = ["male", "female", "non_binary", "genderfluid", "other"] as const;
type GendersOptions = (typeof gendersOptions)[number];

const yearOfStudyOptions = [
    "First year",
    "Second year",
    "Third year",
    "Fourth year",
    "Fifth year",
    "Postgraduate",
    "Graduated",
    "Not at university",
] as const;
type YearOfStudyOptions = (typeof yearOfStudyOptions)[number];

/**
 * Zod schema for the `profiles` table
 * use to validate an object
 */
const ZProfile = z.object({
    // TODO: switch to uuid in the future
    id: z.string(),
    userId: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    university: z.string().nullable(),
    universityId: z.string().nullable(),
    previousMember: z.boolean().default(false),
    tournamentPasses: z.number().int().default(0),
    yearOfStudy: z.enum(yearOfStudyOptions),
    gender: z.enum(gendersOptions),
    updatedAt: z.date(),
    createdAt: z.date(),
    ethnicity: z.string().default("NA"),
    currentStudy: z.string().default("NA"),
    currentDegree: z.string().default("NA"),
});

/**
 * data transfer object for the `profiles` table
 */
const ZProfileDTO = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    universityId: z.string(),
    previousMember: z.boolean(),
    yearOfStudy: z.enum(yearOfStudyOptions),
    gender: z.enum(gendersOptions),
    ethnicity: z.string(),
    currentStudy: z.string(),
});

type ProfileType = z.infer<typeof ZProfile>;
type ProfileDTOType = z.infer<typeof ZProfileDTO>;

export { ZProfile, ZProfileDTO, gendersOptions, yearOfStudyOptions };
export type { ProfileDTOType, ProfileType, GendersOptions, YearOfStudyOptions };
