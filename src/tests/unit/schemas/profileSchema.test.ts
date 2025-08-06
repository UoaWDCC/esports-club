import { ZProfile } from "@libs/types/profile.type";

import { fakeProfile } from "../../../libs/utils/fake/fake.profile";

describe("Profile Schema", () => {
    // highkey a useless and brittle test but it's a start 💀
    // testing zod for them, who does he think he is? 😭
    it("accepts valid input", () => {
        const validProfile = fakeProfile();
        const result = ZProfile.safeParse(validProfile);

        expect(result.success).toBe(true);
    });
    it("rejects invalid input", () => {
        const validProfile = fakeProfile();
        const invalidProfile = {
            ...validProfile,
            // integer instead of string
            ethnicity: 1,
            currentStudy: 2,
            currentDegree: 3,
        };
        const result = ZProfile.safeParse(invalidProfile);
        expect(result.success).toBe(false);
    });
});
