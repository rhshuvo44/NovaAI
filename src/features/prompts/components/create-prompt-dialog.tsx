"use client";

import * as React from "react";
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
import { promptFormSchema, type PromptFormValues } from "@/lib/validations/forms";
import { useCreatePrompt } from "@/hooks";

export function CreatePromptDialog() {
  const [open, setOpen] = React.useState(false);
  const createPrompt = useCreatePrompt();

  const form = useForm<PromptFormValues>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: { title: "", content: "", isPublic: false },
  });

  function onSubmit(values: PromptFormValues) {
    createPrompt.mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          New prompt
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save a new prompt</DialogTitle>
          <DialogDescription>Build a reusable prompt for your library.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextField control={form.control} name="title" label="Title" placeholder="Weekly report summarizer" autoFocus />
            <TextareaField
              control={form.control}
              name="content"
              label="Prompt"
              placeholder="Summarize the following report into 3 bullet points…"
              rows={6}
              className="font-mono text-sm"
            />
            <SwitchField control={form.control} name="isPublic" label="Make public" description="Share with your team" />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createPrompt.isPending}>
                {createPrompt.isPending ? "Saving…" : "Save prompt"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
