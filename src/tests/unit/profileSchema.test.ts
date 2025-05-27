import { faker } from "@faker-js/faker";
import { gendersOptions, yearOfStudyOptions, ZProfile } from "@libs/db/types/profile";

const mockValidProfile = {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    university: "University of Auckland",
    universityId: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
    previousMember: faker.datatype.boolean(),
    tournamentPasses: 0,
    yearOfStudy: faker.helpers.arrayElement(yearOfStudyOptions),
    gender: faker.helpers.arrayElement(gendersOptions),
    updatedAt: new Date("2024-08-01T12:00:00Z"),
    createdAt: new Date("2023-02-15T09:30:00Z"),
    ethnicity: "",
    currentStudy: "",
    currentDegree: "",
};

const mockInvalidProfile = {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    university: "University of Auckland",
    universityId: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
    previousMember: faker.datatype.boolean(),
    tournamentPasses: 0,
    yearOfStudy: faker.helpers.arrayElement(yearOfStudyOptions),
    gender: faker.helpers.arrayElement(gendersOptions),
    updatedAt: new Date("2024-08-01T12:00:00Z"),
    createdAt: new Date("2023-02-15T09:30:00Z"),
    ethnicity: 1, // invalid type
    currentStudy: 2, // invalid type
    currentDegree: 3, // invalid type
};

describe("Profile Schema", () => {
    it("accepts valid input", () => {
        const result = ZProfile.safeParse(mockValidProfile);
        expect(result.success).toBe(true);
    });
    it("rejects invalid input", () => {
        const result = ZProfile.safeParse(mockInvalidProfile);
        expect(result.success).toBe(false);
    });
});
