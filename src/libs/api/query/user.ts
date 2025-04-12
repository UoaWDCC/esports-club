export const getUsers = async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    const random = Math.floor(1 + Math.random() * 10);
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${random}`, {
        cache: "no-cache",
    });
    return res.json();
};
