import Button from "@ui/button/Button";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white text-lg">
      <div className="flex flex-col items-center justify-center gap-10">
        <h3>404 - Page Not Found</h3>
        <Button href="/" variant={{ style: "solid" }}>
          Return Home
        </Button>
      </div>
    </div>
  );
}