import { z } from "zod";

// THIS IS A DEMO EXAMPLE FOR TANSTACK QUERY

export const CommentDTO = z.object({
    postId: z.string(),
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    body: z.string(),
});

export type CommentDTO = z.infer<typeof CommentDTO>;
