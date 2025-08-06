import "dotenv/config";

import { MembershipTypeDTO } from "@libs/types/membershipType.type";
import { membershipTypes } from "@schema";

import { db } from "..";

/**
 * seeds membershipType
 * usage tsx '.\src\libs\db\seed\membershipType.seed.ts'
 */
async function seedMembershipType() {
    const newMembershipType: MembershipTypeDTO = {
        name: "VIP",
        description: "VIP membership",
        startAt: new Date(),
        endAt: new Date("9999-12-31"),
        price: 9999,
    };

    const result = await db.insert(membershipTypes).values(newMembershipType).returning().execute();

    console.log(`Inserted new a membershipType of id: ${result[0].id}`);
}

seedMembershipType()
    .then(() => {
        console.log("Seeding membershipType completed!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error seeding membershipType:", err);
        process.exit(1);
    });
