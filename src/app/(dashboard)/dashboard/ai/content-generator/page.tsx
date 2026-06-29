"use client";

import { PenLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/forms/text-field";
import { SelectField } from "@/components/forms/select-field";
import { AiToolLayout } from "@/features/ai/components/ai-tool-layout";
import { AiOutputPanel } from "@/features/ai/components/ai-output-panel";
import { contentGeneratorFormSchema, type ContentGeneratorFormValues } from "@/lib/validations/forms";
import { useGenerateContent } from "@/hooks";

export default function ContentGeneratorPage() {
  const generateContent = useGenerateContent();

  const form = useForm<ContentGeneratorFormValues>({
    resolver: zodResolver(contentGeneratorFormSchema),
    defaultValues: { topic: "", tone: "professional", length: "medium" },
  });

  function onSubmit(values: ContentGeneratorFormValues) {
    generateContent.mutate(values);
  }

  return (
    <AiToolLayout
      title="Content Generator"
      description="Generate a first draft on any topic, in your preferred tone."
      icon={<PenLine className="h-5 w-5" />}
      input={
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <TextField
                  control={form.control}
                  name="topic"
                  label="Topic"
                  placeholder="The benefits of asynchronous work"
                />
                <SelectField
                  control={form.control}
                  name="tone"
                  label="Tone"
                  options={[
                    { label: "Professional", value: "professional" },
                    { label: "Casual", value: "casual" },
                    { label: "Persuasive", value: "persuasive" },
                    { label: "Technical", value: "technical" },
                  ]}
                />
                <SelectField
                  control={form.control}
                  name="length"
                  label="Length"
                  options={[
                    { label: "Short (~100 words)", value: "short" },
                    { label: "Medium (~300 words)", value: "medium" },
                    { label: "Long (~600 words)", value: "long" },
                  ]}
                />
                <Button type="submit" className="w-full" disabled={generateContent.isPending}>
                  {generateContent.isPending ? "Generating…" : "Generate content"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      }
      output={
        <AiOutputPanel
          content={generateContent.data?.content ?? null}
          isLoading={generateContent.isPending}
          onRegenerate={() => generateContent.mutate(form.getValues())}
          emptyMessage="Describe a topic and generate your first draft."
        />
      }
    />
  );
}
