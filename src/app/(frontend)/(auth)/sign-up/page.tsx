import GoogleAuthButton from "@ui/button/GoogleAuthButton";
import StandardLayout from "@ui/layout/StandardLayout";

export default async function SignUpPage() {
    return (
        <StandardLayout>
            <div className="w-full">
                <GoogleAuthButton />
            </div>
        </StandardLayout>
    );
}
