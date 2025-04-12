import Button from "@ui/button/Button";

import { signOut } from "@/auth";

export default function SignOut() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <Button variant={{ style: "solid" }} type="submit">
                SignOut
            </Button>
        </form>
    );
}
