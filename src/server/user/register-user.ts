"use server";

import { db } from "@libs/db";
import { users } from "@libs/db/schema";
import bcrypt from "bcryptjs";
import { z } from "zod";

export async function createUser(formData: FormData) {
    const createUserSchema = z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const raw = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const parsed = createUserSchema.safeParse(raw);

    if (!parsed.success) {
        return { error: "Invalid input", details: parsed.error.flatten() };
    }

    const { name, email, password } = parsed.data;

    const existingUser = await db.query.users.findFirst({
        where: (u, { eq }) => eq(u.email, email),
    });

    if (existingUser) {
        return { error: "User with this email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
        role: "user",
    });

    return { success: true };
}
