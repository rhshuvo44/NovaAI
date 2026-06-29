"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/forms/text-field";
import { FullPageSpinner } from "@/components/loaders/spinner";
import { profileFormSchema, type ProfileFormValues } from "@/lib/validations/forms";
import { useCurrentUser, useUpdateOwnProfile } from "@/hooks";
import { getUserDisplayName, getUserInitials } from "@/types/user";
import { ROLE_LABELS } from "@/types/rbac";
import { format } from "date-fns";

export default function ProfilePage() {
  const { data: user, isLoading } = useCurrentUser();
  const updateProfile = useUpdateOwnProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    values: user ? { firstName: user.firstName ?? "", lastName: user.lastName ?? "", avatarUrl: user.avatarUrl ?? "" } : undefined,
  });

  if (isLoading || !user) return <FullPageSpinner />;

  function onSubmit(values: ProfileFormValues) {
    updateProfile.mutate(values);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your personal information.</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatarUrl} alt={getUserDisplayName(user)} />
            <AvatarFallback className="text-lg">{getUserInitials(user)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{getUserDisplayName(user)}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              {user.email}
              <Badge variant="primary">{ROLE_LABELS[user.role]}</Badge>
            </CardDescription>
            <p className="mt-1 text-xs text-muted-foreground">
              Member since {format(new Date(user.createdAt), "MMMM yyyy")}
            </p>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <TextField control={form.control} name="firstName" label="First name" placeholder="Ada" />
                <TextField control={form.control} name="lastName" label="Last name" placeholder="Lovelace" />
              </div>
              <TextField control={form.control} name="avatarUrl" label="Avatar URL" placeholder="https://…" />
              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending ? "Saving…" : "Save changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
