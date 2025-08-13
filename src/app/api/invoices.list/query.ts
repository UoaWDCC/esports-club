import { ApiResponse } from "@libs/api/response";
import { useQuery } from "@tanstack/react-query";

import { InvoiceListResponse } from "./type";

export const useInvoiceListQuery = () => {
    const query = useQuery<
        ApiResponse<InvoiceListResponse[]>,
        Error,
        ApiResponse<InvoiceListResponse[]>
    >({
        queryKey: ["list-my-invoices"],
        queryFn: fetchMyInvoices,
        staleTime: 5000 /*ms*/,
    });
    return query;
};

export const fetchMyInvoices = async (): Promise<ApiResponse<InvoiceListResponse[]>> => {
    const res = await fetch("/api/invoices.list", { cache: "no-cache" });
    if (!res.ok) {
        throw new Error("Failed to fetch Invoices");
    }

    return await res.json();
};