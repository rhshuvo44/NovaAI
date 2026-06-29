import { redirect } from "next/navigation";

export default function AdminLogsPage() {
  // The backend exposes audit trail data via /audit-logs; there is no
  // separate public API for raw system logs (those are internal,
  // file-based Winston logs not surfaced over HTTP). Audit is the closest
  // and most relevant equivalent available to the frontend.
  redirect("/admin/audit");
}
