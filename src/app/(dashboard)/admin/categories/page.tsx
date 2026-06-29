"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderTree, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/forms/text-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { CardGridSkeleton } from "@/components/loaders/skeletons";
import { EmptyState } from "@/components/empty-state/empty-state";
import { categoryFormSchema, type CategoryFormValues } from "@/lib/validations/forms";
import { useCategories, useCreateCategory, useDeleteCategory } from "@/hooks";

export default function AdminCategoriesPage() {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = useCategories({ page: 1, limit: 50 });
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { name: "", description: "" },
  });

  function onSubmit(values: CategoryFormValues) {
    createCategory.mutate(values, { onSuccess: () => { setOpen(false); form.reset(); } });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-muted-foreground">Organize documents and content across the workspace.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              New category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create category</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <TextField control={form.control} name="name" label="Name" placeholder="Engineering" />
                <TextareaField control={form.control} name="description" label="Description" rows={3} />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createCategory.isPending}>
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <CardGridSkeleton count={4} />
      ) : data?.items.length ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((category) => (
            <Card key={category._id}>
              <CardContent className="flex items-start justify-between gap-2 pt-6">
                <div className="flex items-start gap-3">
                  <FolderTree className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">{category.name}</p>
                    {category.description && (
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    )}
                    <Badge variant="outline" className="mt-2">
                      {category.slug}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-error"
                  onClick={() => deleteCategory.mutate(category._id)}
                  aria-label="Delete category"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon={FolderTree} title="No categories yet" />
      )}
    </div>
  );
}
