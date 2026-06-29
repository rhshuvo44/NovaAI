"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/forms/text-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/forms";
import { analyticsService } from "@/services/api/analytics.service";

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    // There is no dedicated /contact endpoint on the backend. We record the
    // submission as an analytics event so it's visible to operators, rather
    // than silently discarding it or pretending a ticketing system exists.
    try {
      await analyticsService.track("contact_form_submitted", "contact", { ...values });
      toast.success("Message sent. We'll get back to you within one business day.");
      form.reset();
    } catch {
      toast.error("Something went wrong sending your message. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <TextField control={form.control} name="name" label="Name" placeholder="Ada Lovelace" />
          <TextField control={form.control} name="email" type="email" label="Email" placeholder="ada@example.com" />
        </div>
        <TextField control={form.control} name="subject" label="Subject" placeholder="Question about Team plan" />
        <TextareaField control={form.control} name="message" label="Message" rows={5} placeholder="How can we help?" />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending…" : "Send message"}
        </Button>
      </form>
    </Form>
  );
}
