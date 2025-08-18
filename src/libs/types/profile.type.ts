import { z } from "zod";

export const GENDER_OPTIONS = ["male", "female", "non_binary", "genderfluid", "other"] as const;
export const YEAR_OF_STUDY_OPTIONS = [
    "First year",
    "Second year",
    "Third year",
    "Fourth year",
    "Fifth year",
    "Postgraduate",
    "Graduated",
    "Not at university",
] as const;

export type GendersOptions = (typeof GENDER_OPTIONS)[number];
export type YearOfStudyOptions = (typeof YEAR_OF_STUDY_OPTIONS)[number];

/**
 * Zod schema for the `profiles` table
 * use to validate an object
 */
export const ZProfile = z.object({
    // TODO: switch to uuid in the future
    id: z.string(),
    userId: z.string().nullable().optional(),
    firstName: z.string().min(1, { message: "Field is required" }),
    lastName: z.string().min(1, { message: "Field is required" }),
    email: z.string().email(),
    university: z.string().nullable(),
    universityId: z.string().nullable().optional(),
    previousMember: z.boolean().default(false),
    tournamentPasses: z.number().int().default(0),
    yearOfStudy: z.enum(YEAR_OF_STUDY_OPTIONS),
    gender: z.enum(GENDER_OPTIONS),
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    ethnicity: z.string().nullable().optional(),
    currentStudy: z.string().nullable().optional(),
    currentDegree: z.string().nullable().optional(),
});

/**
 * data transfer object for the `profiles` table
 */
export const ZProfileInsertionDTO = ZProfile.omit({
    id: true,
    updatedAt: true,
    createdAt: true,
    tournamentPasses: true,
});

export const ZProfileDTO = ZProfile.omit({
    id: true,
    userId: true,
    updatedAt: true,
    createdAt: true,
});

export const ZProfileCreationDTO = ZProfileDTO.omit({
    email: true,
    previousMember: true,
});

export type Profile = z.infer<typeof ZProfile>;
export type ProfileDTO = z.infer<typeof ZProfileDTO>;
export type ProfileInsertionDTO = z.infer<typeof ZProfileInsertionDTO>;
export type ProfileCreationDTO = z.infer<typeof ZProfileCreationDTO>;
