import type { Article } from "./type";

const STORAGE_KEY = "dashboard_articles";

export const articleService = {
  load: (): Article[] => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  save: (articles: Article[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  },

  createArticle: (title: string, body: string, user: { id: number; name: string }): Article => ({
    id: `article_${Date.now()}`,
    title: title.trim(),
    body: body.trim(),
    authorId: user.id,
    authorName: user.name,
    createdAt: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  })
};