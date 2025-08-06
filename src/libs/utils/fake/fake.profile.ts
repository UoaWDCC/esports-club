import { faker } from "@faker-js/faker";
import { GENDER_OPTIONS, ProfileDTO, YEAR_OF_STUDY_OPTIONS } from "@libs/types/profile.type";

export const fakeProfile = () =>
    ({
        id: faker.string.uuid(),
        userId: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        university: "University of Auckland",
        universityId: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
        previousMember: faker.datatype.boolean(),
        tournamentPasses: 0,
        yearOfStudy: faker.helpers.arrayElement(YEAR_OF_STUDY_OPTIONS),
        gender: faker.helpers.arrayElement(GENDER_OPTIONS),
        updatedAt: new Date("2024-08-01T12:00:00Z"),
        createdAt: new Date("2023-02-15T09:30:00Z"),
        ethnicity: "",
        currentStudy: "",
        currentDegree: "",
    }) as ProfileDTO;

// tsx .\src\libs\utils\fake\fake.profile.ts
console.log(fakeProfile());
