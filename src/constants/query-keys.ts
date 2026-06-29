export const queryKeys = {
  currentUser: ["currentUser"] as const,
  users: (params?: unknown) => ["users", params] as const,
  user: (id: string) => ["users", id] as const,

  documents: (params?: unknown) => ["documents", params] as const,
  document: (id: string) => ["documents", id] as const,
  documentSearch: (query: string) => ["documents", "search", query] as const,

  categories: (params?: unknown) => ["categories", params] as const,
  category: (id: string) => ["categories", id] as const,

  tags: (params?: unknown) => ["tags", params] as const,

  favorites: (params?: unknown) => ["favorites", params] as const,

  notifications: (params?: unknown) => ["notifications", params] as const,
  notificationUnreadCount: ["notifications", "unread-count"] as const,

  chats: (params?: unknown) => ["chats", params] as const,
  chat: (id: string) => ["chats", id] as const,
  chatMessages: (id: string) => ["chats", id, "messages"] as const,

  prompts: (params?: unknown) => ["prompts", params] as const,
  prompt: (id: string) => ["prompts", id] as const,

  uploads: (id: string) => ["uploads", id] as const,

  analyticsSummary: (daysBack: number) => ["analytics", "summary", daysBack] as const,
  dashboardOverview: ["dashboard", "overview"] as const,

  roles: (params?: unknown) => ["roles", params] as const,
  role: (id: string) => ["roles", id] as const,
  permissions: (params?: unknown) => ["permissions", params] as const,

  userSettings: ["settings", "user"] as const,
  systemSetting: (key: string) => ["settings", "system", key] as const,

  auditLogs: (params?: unknown) => ["audit-logs", params] as const,
  apiKeys: (params?: unknown) => ["api-keys", params] as const,
};
