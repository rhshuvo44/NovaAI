"use client";

import * as React from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { settingsService } from "@/services/api/settings.service";
import { toast } from "sonner";

const SETTINGS_KEYS = {
  maintenanceMode: "maintenance_mode",
  allowSignups: "allow_signups",
  supportEmail: "support_email",
};

export default function AdminSystemSettingsPage() {
  const { data: maintenanceMode } = useQuery({
    queryKey: ["settings", "system", SETTINGS_KEYS.maintenanceMode],
    queryFn: () => settingsService.getSystemSetting<boolean>(SETTINGS_KEYS.maintenanceMode),
    retry: false,
  });

  const { data: supportEmail } = useQuery({
    queryKey: ["settings", "system", SETTINGS_KEYS.supportEmail],
    queryFn: () => settingsService.getSystemSetting<string>(SETTINGS_KEYS.supportEmail),
    retry: false,
  });

  const [emailDraft, setEmailDraft] = React.useState("");

  React.useEffect(() => {
    if (supportEmail?.value) setEmailDraft(supportEmail.value);
  }, [supportEmail]);

  const setMaintenanceMode = useMutation({
    mutationFn: (value: boolean) => settingsService.setSystemSetting(SETTINGS_KEYS.maintenanceMode, value),
    onSuccess: () => toast.success("Setting updated"),
  });

  const setSupportEmail = useMutation({
    mutationFn: (value: string) => settingsService.setSystemSetting(SETTINGS_KEYS.supportEmail, value),
    onSuccess: () => toast.success("Setting updated"),
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
          <SettingsIcon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold">System Settings</h1>
          <p className="text-sm text-muted-foreground">Workspace-wide configuration.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Access</CardTitle>
          <CardDescription>Control who can use the workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Maintenance mode</Label>
              <p className="text-xs text-muted-foreground">Temporarily block new sign-ins workspace-wide.</p>
            </div>
            <Switch
              checked={Boolean(maintenanceMode?.value)}
              onCheckedChange={(checked) => setMaintenanceMode.mutate(checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Support</CardTitle>
          <CardDescription>Where users are directed for help.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="support-email">Support email</Label>
          <div className="flex gap-2">
            <Input
              id="support-email"
              value={emailDraft}
              onChange={(event) => setEmailDraft(event.target.value)}
              placeholder="support@aiworkspace.dev"
            />
            <Button onClick={() => setSupportEmail.mutate(emailDraft)} disabled={setSupportEmail.isPending}>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
