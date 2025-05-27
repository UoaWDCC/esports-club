import { ZProfile } from "@libs/db/types/profile";

const mockValidProfile = {
    id: "abc123",
    userId: "user456",
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@example.com",
    university: "University of Otago",
    universityId: "UO123456",
    previousMember: true,
    tournamentPasses: 2,
    yearOfStudy: "Second year",
    gender: "non_binary",
    updatedAt: new Date("2024-08-01T12:00:00Z"),
    createdAt: new Date("2023-02-15T09:30:00Z"),
    ethnicity: "asian",
    currentStudy: "Psychology",
    currentDegree: "BA",
};

const mockInvalidProfile = {
    id: "abc123",
    userId: "user456",
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@example.com",
    university: "University of Otago",
    universityId: "UO123456",
    previousMember: true,
    tournamentPasses: 2,
    ethnicity: "asian",
    currentStudy: "Psychology",
    currentDegree: "BA",
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
