import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(150, "Name must be 150 characters or fewer"),
  description: z.string().max(500, "Description must be 500 characters or fewer").optional(),
  parentId: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const promptFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be 200 characters or fewer"),
  content: z.string().min(1, "Prompt content is required"),
  isPublic: z.boolean(),
});

export type PromptFormValues = z.infer<typeof promptFormSchema>;

export const profileFormSchema = z.object({
  firstName: z.string().max(100, "First name must be 100 characters or fewer").optional(),
  lastName: z.string().max(100, "Last name must be 100 characters or fewer").optional(),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const newsletterFormSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

export const contentGeneratorFormSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  tone: z.enum(["professional", "casual", "persuasive", "technical"]),
  length: z.enum(["short", "medium", "long"]),
});

export type ContentGeneratorFormValues = z.infer<typeof contentGeneratorFormSchema>;
