export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  icon?: string;
  color?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  _id: string;
  name: string;
  slug: string;
  ownerId: string;
  usageCount: number;
  aiGenerated: boolean;
  createdAt: string;
}

export interface Document {
  _id: string;
  title: string;
  content: string;
  ownerId: string;
  categoryId?: string;
  tags: string[];
  isPublic: boolean;
  isArchived: boolean;
  aiGenerated: boolean;
  aiSummary?: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDocumentInput {
  title: string;
  content: string;
  categoryId?: string;
  tags?: string[];
  isPublic?: boolean;
}

export type UpdateDocumentInput = Partial<CreateDocumentInput>;
