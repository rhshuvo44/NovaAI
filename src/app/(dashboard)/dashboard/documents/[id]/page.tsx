"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowLeft, Trash2, Archive, Save, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/forms/text-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { SwitchField } from "@/components/forms/toggle-fields";
import { Badge } from "@/components/ui/badge";
import { FullPageSpinner } from "@/components/loaders/spinner";
import { ErrorState } from "@/components/empty-state/error-state";
import { AiSummaryPanel } from "@/features/documents/components/ai-summary-panel";
import { AiTagsPanel } from "@/features/documents/components/ai-tags-panel";
import { documentFormSchema, type DocumentFormValues } from "@/lib/validations/document";
import { useDocument, useUpdateDocument, useDeleteDocument, useArchiveDocument, useAddFavorite, useRemoveFavorite } from "@/hooks";
import { FavoriteEntityType } from "@/types/ai";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DocumentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: document, isLoading, isError, refetch } = useDocument(params.id);
  const updateDocument = useUpdateDocument(params.id);
  const deleteDocument = useDeleteDocument();
  const archiveDocument = useArchiveDocument();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const [isFavorited, setIsFavorited] = React.useState(false);

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    values: document
      ? { title: document.title, content: document.content, isPublic: document.isPublic }
      : undefined,
  });

  if (isLoading) return <FullPageSpinner />;
  if (isError || !document) return <ErrorState onRetry={() => refetch()} />;

  function onSubmit(values: DocumentFormValues) {
    updateDocument.mutate(values);
  }

  function toggleFavorite() {
    if (isFavorited) {
      removeFavorite.mutate({ entityType: FavoriteEntityType.DOCUMENT, entityId: document!._id });
    } else {
      addFavorite.mutate({ entityType: FavoriteEntityType.DOCUMENT, entityId: document!._id });
    }
    setIsFavorited(!isFavorited);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/documents")}>
          <ArrowLeft className="h-4 w-4" />
          Back to documents
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="outline">v{document.version}</Badge>
          <span className="text-xs text-muted-foreground">
            Updated {format(new Date(document.updatedAt), "MMM d, yyyy 'at' h:mm a")}
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextField control={form.control} name="title" className="font-display text-xl font-semibold h-auto py-3" />
          <TextareaField control={form.control} name="content" rows={14} className="font-mono text-sm" />
          <div className="flex items-center justify-between">
            <SwitchField
              control={form.control}
              name="isPublic"
              label="Public"
              description="Anyone with the link can view"
              className="max-w-xs"
            />
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="icon" onClick={toggleFavorite} aria-label="Toggle favorite">
                <Bookmark className={isFavorited ? "fill-current text-primary" : ""} />
              </Button>
              <Button type="button" variant="outline" onClick={() => archiveDocument.mutate(document._id)}>
                <Archive className="h-4 w-4" />
                Archive
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="outline" className="text-error hover:text-error">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this document?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action can&apos;t be undone. The document will be permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-error hover:bg-error/90"
                      onClick={() =>
                        deleteDocument.mutate(document._id, {
                          onSuccess: () => router.push("/dashboard/documents"),
                        })
                      }
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button type="submit" disabled={updateDocument.isPending}>
                <Save className="h-4 w-4" />
                {updateDocument.isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <AiSummaryPanel content={document.content} />
      <AiTagsPanel content={document.content} />
    </div>
  );
}
