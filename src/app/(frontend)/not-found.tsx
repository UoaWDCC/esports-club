import Button from "@/components/button/Button";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-lg text-white">
            <div className="flex flex-col items-center justify-center gap-10">
                <h3>404 - Page Not Found</h3>
                <Button href="/" variant={{ style: "solid" }}>
                    Return Home
                </Button>
            </div>
        </div>
    );
}
