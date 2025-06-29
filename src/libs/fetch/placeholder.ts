"use server";

export const fetchPlaceholder = async () => {
    // Simulate additional network delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    const random = Math.floor(1 + Math.random() * 100);
    // free api
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${random}`, {
        cache: "no-cache",
    });
    return res.json();
};
