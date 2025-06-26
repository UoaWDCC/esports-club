import { db } from "@libs/db";
import { user } from "@schema";
import { eq } from "drizzle-orm";

export const isEmailVerified = async (email: string) => {
    const isVerified = await db
        .select({ isVerified: user.emailVerified })
        .from(user)
        .where(eq(user.email, email.toLowerCase()))
        .limit(1);

    return isVerified[0]?.isVerified ?? false;
};
