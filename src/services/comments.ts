"use server";

// THIS IS A DEMO EXAMPLE FOR TANSTACK QUERY
import { CommentDTO } from "@libs/types/CommentDTO";

export const getComment = async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    const random = Math.floor(1 + Math.random() * 500);
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments/${random}`, {
        cache: "no-cache",
    });
    return res.json();
};

export const CreateComment = async (comment: CommentDTO) => {
    const res = CommentDTO.safeParse(comment);
    console.log(res.error?.message);
    if (!res.success) {
        throw new Error("Invalid comment data");
    }
    console.log("Data:", res.data);
};

export default CreateComment;
