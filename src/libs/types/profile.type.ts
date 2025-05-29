import { z } from "zod/v4";

const GENDER_OPTIONS = ["male", "female", "non_binary", "genderfluid", "other"] as const;
const YEAR_OF_STUDY_OPTIONS = [
    "First year",
    "Second year",
    "Third year",
    "Fourth year",
    "Fifth year",
    "Postgraduate",
    "Graduated",
    "Not at university",
] as const;

type GendersOptions = (typeof GENDER_OPTIONS)[number];
type YearOfStudyOptions = (typeof YEAR_OF_STUDY_OPTIONS)[number];

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
    yearOfStudy: z.enum(YEAR_OF_STUDY_OPTIONS),
    gender: z.enum(GENDER_OPTIONS),
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
    yearOfStudy: z.enum(YEAR_OF_STUDY_OPTIONS),
    gender: z.enum(GENDER_OPTIONS),
    ethnicity: z.string(),
    currentStudy: z.string(),
});

type Profile = z.infer<typeof ZProfile>;
type ProfileDTO = z.infer<typeof ZProfileDTO>;

export { ZProfile, ZProfileDTO, GENDER_OPTIONS, YEAR_OF_STUDY_OPTIONS };
export type { ProfileDTO, Profile, GendersOptions, YearOfStudyOptions };
