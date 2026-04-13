export interface Article {
  id: string;
  title: string;
  body: string;
  authorId: number;
  authorName: string;
  createdAt: string;
}

export type FilterType = "all" | "mine";