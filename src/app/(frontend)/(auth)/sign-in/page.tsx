import GoogleAuthButton from "@ui/button/GoogleAuthButton";
import StandardLayout from "@ui/layout/StandardLayout";

export default async function SignInPage() {
    return (
        <StandardLayout>
            <div className="w-full">
                <GoogleAuthButton />
            </div>
        </StandardLayout>
    );
}
