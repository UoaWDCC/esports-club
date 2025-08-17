import { UseQueryResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

type Props = {
    children?: React.ReactNode;
    query?: UseQueryResult;
};

const LoadingBoundary = ({ children, query }: Props) => {
    if (query?.isPending) {
        return (
            <div className="flex size-full items-center justify-center">
                <Loader2 className="animate-spin" size={16} />
            </div>
        );
    }

    if (query?.isError) {
        <div className="flex size-full items-center justify-center">
            <p className="text-red-500">{query.error.message}</p>
        </div>;
    }

    return children;
};

export default LoadingBoundary;
