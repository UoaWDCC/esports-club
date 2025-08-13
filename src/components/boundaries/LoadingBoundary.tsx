import { Loader2 } from "lucide-react";

type Props = {
    children: React.ReactNode;
    loading: boolean;
};

const LoadingBoundary = ({ children, loading }: Props) => {
    if (loading) {
        return (
            <div className="flex size-full items-center justify-center">
                <Loader2 className="animate-spin" size={16} />
            </div>
        );
    }
    return children;
};

export default LoadingBoundary;
