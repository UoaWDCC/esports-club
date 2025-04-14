import { signIn } from "@/auth";
import { createUser } from "@/server/user/register-user";

export default function CredentialsRegister() {
    return (
        <form
            className="flex flex-col gap-4 *:border *:border-white *:p-2"
            action={async (formData) => {
                "use server";
                try {
                    // jhank
                    const res = await createUser(formData);
                    if (res.error) {
                        console.log(res.error);
                        return;
                    }
                    await signIn("credentials", {
                        email: formData.get("email"),
                        password: formData.get("password"),
                        redirect: true,
                        redirectTo: "/profile",
                    });
                } catch (error) {
                    console.log(error);
                }
            }}
        >
            <input name="name" type="text" placeholder="name" defaultValue="ASDF" />
            <input
                name="email"
                type="email"
                placeholder="email"
                defaultValue="ASDFghjk@gmail.com"
            />
            <input
                name="password"
                type="password"
                placeholder="password"
                defaultValue="ASDFghkj1234%^*&"
            />

            <button className="bg-white text-black" type="submit">
                Register
            </button>
        </form>
    );
}
