export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}

export interface Chat {
  _id: string;
  userId: string;
  title: string;
  isArchived: boolean;
  lastMessageAt?: string;
  messageCount: number;
  aiModel: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  chatId: string;
  userId: string;
  role: MessageRole;
  content: string;
  tokensUsed?: number;
  aiModel?: string;
  createdAt: string;
}

export interface SendMessageResult {
  userMessage: Message;
  assistantMessage: Message;
}
