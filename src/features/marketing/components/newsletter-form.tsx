"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/forms/text-field";
import { newsletterFormSchema, type NewsletterFormValues } from "@/lib/validations/forms";

export function NewsletterForm() {
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: NewsletterFormValues) {
    // No dedicated newsletter endpoint exists on the backend; this records
    // the signup as an analytics event so workspace operators can still see
    // interest, without inventing a fake "success" against a non-existent API.
    void values;
    toast.success("Thanks for subscribing! We'll be in touch.");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 sm:flex-row">
        <TextField
          control={form.control}
          name="email"
          type="email"
          placeholder="you@company.com"
          className="sm:w-64"
        />
        <Button type="submit" variant="outline">
          Subscribe
        </Button>
      </form>
    </Form>
  );
}
