import StandardLayout from "@ui/layout/StandardLayout";

import { CSVReader } from "@/components/CSVReader";

export default async function SignInPage() {
    return (
        <StandardLayout>
            <div className="w-full">
                <CSVReader></CSVReader>
            </div>
        </StandardLayout>
    );
}
