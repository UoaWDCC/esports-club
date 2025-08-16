import { useQuery } from "@tanstack/react-query";

import { InvoiceListResponse, ZInvoiceListResponse } from "./type";

export const useInvoiceListQuery = () => {
    const query = useQuery<InvoiceListResponse, Error, InvoiceListResponse>({
        queryKey: ["list-my-invoices"],
        queryFn: fetchMyInvoices,
        staleTime: 5000 /*ms*/,
    });
    return query;
};

export const fetchMyInvoices = async () => {
    const res = await fetch("/api/invoices.list", { cache: "no-cache" });
    if (!res.ok) {
        throw new Error("Failed to fetch Invoices");
    }

    return ZInvoiceListResponse.parse(await res.json());
};
