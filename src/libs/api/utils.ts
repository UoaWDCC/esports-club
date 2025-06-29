// client side api utils for data handling
// error on status outside 200-299 see
// https://developer.mozilla.org/en-US/docs/Web/API/Response/ok

// use for easier error handling in combination with react-hook-form
// ok -> proceed,
// error -> throw -> error display via react hook form
export const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
            errorData?.message || `${response.status} Error: ${response.statusText}`;

        throw new Error(errorMessage);
    }

    return response.json();
};
