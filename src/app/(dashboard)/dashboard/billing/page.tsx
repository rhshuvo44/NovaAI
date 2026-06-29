"use client";

import { CreditCard, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDashboardOverview } from "@/hooks";

const TOKEN_LIMIT = 100_000;

export default function BillingPage() {
  const { data: overview } = useDashboardOverview();
  const used = overview?.aiTokensUsedThisMonth ?? 0;
  const percentUsed = Math.min(100, Math.round((used / TOKEN_LIMIT) * 100));

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage your plan and usage.</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              Free plan
              <Badge variant="primary">Current</Badge>
            </CardTitle>
            <CardDescription>100,000 AI tokens included per month</CardDescription>
          </div>
          <Button>
            <Zap className="h-4 w-4" />
            Upgrade plan
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">AI tokens used this month</span>
            <span className="font-medium tabular-nums">
              {used.toLocaleString()} / {TOKEN_LIMIT.toLocaleString()}
            </span>
          </div>
          <Progress value={percentUsed} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4" />
            Payment method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No payment method on file. Add one to upgrade your plan.</p>
        </CardContent>
      </Card>
    </div>
  );
}
