import { PageLayout } from "@/components/layout/PageLayout";

import { CSVReader } from "./components/CSVReader";

export default async function CSVUploadPage() {
    return (
        <PageLayout>
            <div className="w-full">
                <CSVReader />
            </div>
        </PageLayout>
    );
}
