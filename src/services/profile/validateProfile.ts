import { ZProfileDTO } from "@libs/types/profile";

export async function validateProfile<T extends object>(member: T) {
    const parsed = ZProfileDTO.safeParse(member);
    if (!parsed.success) {
        return { error: "Invalid input", details: parsed.error.flatten() };
    }

    return { success: true };
}
