"use client";

import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FullPageSpinner } from "@/components/loaders/spinner";
import { ErrorState } from "@/components/empty-state/error-state";
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
import { useUser, useDeleteUser } from "@/hooks";
import { getUserDisplayName, getUserInitials } from "@/types/user";
import { ROLE_LABELS } from "@/types/rbac";

export default function AdminUserDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: user, isLoading, isError, refetch } = useUser(params.id);
  const deleteUser = useDeleteUser();

  if (isLoading) return <FullPageSpinner />;
  if (isError || !user) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button variant="ghost" size="sm" onClick={() => router.push("/admin/users")}>
        <ArrowLeft className="h-4 w-4" />
        Back to users
      </Button>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="text-lg">{getUserInitials(user)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{getUserDisplayName(user)}</CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-error hover:text-error">
                <Trash2 className="h-4 w-4" />
                Delete user
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this user?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove {getUserDisplayName(user)}&apos;s account. This action can&apos;t be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-error hover:bg-error/90"
                  onClick={() => deleteUser.mutate(user._id, { onSuccess: () => router.push("/admin/users") })}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
          <div>
            <p className="text-muted-foreground">Role</p>
            <Badge variant="primary" className="mt-1">
              {ROLE_LABELS[user.role]}
            </Badge>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <Badge variant={user.isActive ? "success" : "outline"} className="mt-1">
              {user.isActive ? "Active" : "Deactivated"}
            </Badge>
          </div>
          <div>
            <p className="text-muted-foreground">Joined</p>
            <p className="mt-1">{format(new Date(user.createdAt), "MMMM d, yyyy")}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last login</p>
            <p className="mt-1">{user.lastLoginAt ? format(new Date(user.lastLoginAt), "MMM d, yyyy 'at' h:mm a") : "Never"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
