import "dotenv/config";

import { db } from "@libs/db";
import { membershipTypes } from "@libs/db/schema";

export async function seedMembershipTypes() {
    try {
        console.log("Seeding membership types...");

        // Calculate semester dates (you may want to adjust these based on your academic calendar)
        const now = new Date();
        const oneSemesterEnd = new Date(now);
        oneSemesterEnd.setMonth(oneSemesterEnd.getMonth() + 4); // ~4 months for one semester

        const twoSemesterEnd = new Date(now);
        twoSemesterEnd.setMonth(twoSemesterEnd.getMonth() + 8); // ~8 months for two semesters

        const membershipTypeData = [
            {
                name: "1 Semester Plan",
                description: "Access to all esports club activities for one semester",
                startAt: now,
                endAt: oneSemesterEnd,
                price: 1000, // $10.00 in cents
                isActive: true,
            },
            {
                name: "2 Semester Plan",
                description: "Access to all esports club activities for two semesters",
                startAt: now,
                endAt: twoSemesterEnd,
                price: 1500, // $15.00 in cents
                isActive: true,
            },
        ];

        for (const membershipType of membershipTypeData) {
            await db.insert(membershipTypes).values(membershipType);
            console.log(`✅ Created membership type: ${membershipType.name}`);
        }

        console.log("🎉 Membership types seeded successfully!");
    } catch (error) {
        console.error("❌ Error seeding membership types:", error);
        throw error;
    }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
    seedMembershipTypes()
        .then(() => {
            console.log("Seed completed successfully");
            process.exit(0);
        })
        .catch((error) => {
            console.error("Seed failed:", error);
            process.exit(1);
        });
}
