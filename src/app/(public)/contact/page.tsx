import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/features/marketing/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the NovaAI team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Get in touch</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Questions about plans, security, or anything else — we read every message.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          {[
            { icon: Mail, label: "Email", value: "hello@aiworkspace.dev" },
            { icon: MessageCircle, label: "Support", value: "Available via Help Center" },
            { icon: MapPin, label: "Location", value: "Remote-first, worldwide" },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="flex items-center gap-3 pt-6">
                <item.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
