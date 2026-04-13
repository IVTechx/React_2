import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface Article {
  id: string;
  title: string;
  body: string;
  authorId: number;
  authorName: string;
  createdAt: string;
}

const STORAGE_KEY = "dashboard_articles";

const load = (): Article[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const save = (articles: Article[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
};

interface ArticlesContextValue {
  articles: Article[];
  addArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
}

const ArticlesContext = createContext<ArticlesContextValue | null>(null);

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>(load);

  const addArticle = useCallback((article: Article) => {
    const updated = [article, ...load()];
    save(updated);
    setArticles(updated);
  }, []);

  const deleteArticle = useCallback((id: string) => {
    const updated = load().filter((a) => a.id !== id);
    save(updated);
    setArticles(updated);
  }, []);

  return (
    <ArticlesContext.Provider value={{ articles, addArticle, deleteArticle }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const ctx = useContext(ArticlesContext);
  if (!ctx) throw new Error("useArticles must be used inside ArticlesProvider");
  return ctx;
};