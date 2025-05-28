import { ProfileDTOType, ZProfileDTO } from "@libs/db/types/profile";

export async function validateProfile<T extends {}>(member: T) {
    const parsed = ZProfileDTO.safeParse(member);
    if (!parsed.success) {
        return { error: "Invalid input", details: parsed.error.flatten() };
    }

    return { success: true };
}
