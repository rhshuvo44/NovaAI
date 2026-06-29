"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/forms/text-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { SwitchField } from "@/components/forms/toggle-fields";
import { documentFormSchema, type DocumentFormValues } from "@/lib/validations/document";
import { useCreateDocument } from "@/hooks";

export function CreateDocumentDialog() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const createDocument = useCreateDocument();

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: { title: "", content: "", isPublic: false },
  });

  function onSubmit(values: DocumentFormValues) {
    createDocument.mutate(values, {
      onSuccess: (doc) => {
        setOpen(false);
        form.reset();
        router.push(`/dashboard/documents/${doc._id}`);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          New document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new document</DialogTitle>
          <DialogDescription>Give it a title to get started. You can write the content next.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextField control={form.control} name="title" label="Title" placeholder="Q3 strategy notes" autoFocus />
            <TextareaField
              control={form.control}
              name="content"
              label="Content"
              placeholder="Start writing, or leave blank and generate with AI later…"
              rows={5}
            />
            <SwitchField
              control={form.control}
              name="isPublic"
              label="Make public"
              description="Anyone with the link can view this document."
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createDocument.isPending}>
                {createDocument.isPending ? "Creating…" : "Create document"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
