export enum AIFeature {
  CHAT = "chat",
  CONTENT_GENERATOR = "content_generator",
  PROMPT_OPTIMIZER = "prompt_optimizer",
  SUMMARIZER = "summarizer",
  TAGS_GENERATOR = "tags_generator",
  RECOMMENDATION = "recommendation",
}

export interface Prompt {
  _id: string;
  ownerId: string;
  title: string;
  content: string;
  feature: AIFeature;
  isPublic: boolean;
  isFavorite: boolean;
  usageCount: number;
  optimizedVersion?: string;
  createdAt: string;
  updatedAt: string;
}

export enum NotificationType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  SYSTEM = "system",
}

export interface Notification {
  _id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  readAt?: string;
  link?: string;
  createdAt: string;
}

export enum FavoriteEntityType {
  DOCUMENT = "document",
  PROMPT = "prompt",
  CHAT = "chat",
}

export interface Favorite {
  _id: string;
  userId: string;
  entityType: FavoriteEntityType;
  entityId: string;
  createdAt: string;
}

export interface GenerateContentInput {
  topic: string;
  tone?: "professional" | "casual" | "persuasive" | "technical";
  length?: "short" | "medium" | "long";
}

export interface RecommendedDocument {
  documentId: string;
  title: string;
  reason: string;
}

export interface DashboardOverview {
  documentCount: number;
  archivedDocumentCount: number;
  activeChatCount: number;
  promptCount: number;
  unreadNotificationCount: number;
  aiTokensUsedThisMonth: number;
}
