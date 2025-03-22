import { signIn } from "@/auth";

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google");
            }}
        >
            <button
                className="cursor-pointer rounded-2xl border border-white px-8 py-2"
                type="submit"
            >
                Signin with Google
            </button>
        </form>
    );
}
