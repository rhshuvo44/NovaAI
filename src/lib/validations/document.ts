import { z } from "zod";

export const documentFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(300, "Title must be 300 characters or fewer"),
  content: z.string().min(1, "Content is required"),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean(),
});

export type DocumentFormValues = z.infer<typeof documentFormSchema>;
