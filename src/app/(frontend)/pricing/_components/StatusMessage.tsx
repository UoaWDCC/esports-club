import { CheckCircle, Clock, XCircle } from "lucide-react";

export function StatusMessage({
    type,
    title,
    message,
}: {
    type: "success" | "warning" | "info";
    title: string;
    message: string;
}) {
    const Icon = type === "success" ? CheckCircle : type === "warning" ? XCircle : Clock;

    const colors =
        type === "success"
            ? "border-green-200 bg-green-50 text-green-700"
            : type === "warning"
              ? "border-yellow-200 bg-yellow-50 text-yellow-700"
              : "border-gray-200 bg-gray-50 text-gray-700";

    return (
        <div className={`mx-auto mb-8 max-w-md rounded-lg border p-4 ${colors}`}>
            <div className="flex items-center">
                <Icon className="mr-3 h-5 w-5" />
                <div>
                    <h3 className="text-sm font-medium">{title}</h3>
                    <p className="text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
}
