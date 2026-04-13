import { useState } from "react";
import { useUserContext } from "../context/user-context";
import styles from "./WritePage.module.css";
import { useArticles } from "../context/article-context";
import { Icons } from "./Icons";

type Filter = "all" | "mine";

const ArticleList = () => {
  const { currentUser } = useUserContext();
  const { articles, deleteArticle } = useArticles();
  const [filter, setFilter] = useState<Filter>("all");

  if (!currentUser || articles.length === 0) return null;

  const myCount = articles.filter((a) => a.authorId === currentUser.id).length;
  const visible =
    filter === "mine" ? articles.filter((a) => a.authorId === currentUser.id) : articles;

  return (
    <div className={styles.articlesSection}>
      <div className={styles.articlesSectionHeader}>
        <h3 className={styles.articlesHeading}>Articles</h3>
        <div className={styles.filterTabs}>
          <button
            className={`${styles.filterTab} ${filter === "all" ? styles.filterTabActive : ""}`}
            onClick={() => setFilter("all")}
            type="button">
            All <span className={styles.filterCount}>{articles.length}</span>
          </button>
          <button
            className={`${styles.filterTab} ${filter === "mine" ? styles.filterTabActive : ""}`}
            onClick={() => setFilter("mine")}
            type="button">
            My Articles <span className={styles.filterCount}>{myCount}</span>
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className={styles.emptyState}>You haven't written any articles yet.</p>
      ) : (
        <div className={styles.articlesList}>
          {visible.map((article) => (
            <div key={article.id} className={styles.articleItem}>
              <div className={styles.articleMeta}>
                <div className={styles.articleMetaLeft}>
                  <h4 className={styles.articleTitle}>{article.title}</h4>
                  {filter === "all" && (
                    <span className={styles.articleAuthor}>by {article.authorName}</span>
                  )}
                </div>
                <span className={styles.articleDate}>{article.createdAt}</span>
              </div>
              <p className={styles.articlePreview}>{article.body}</p>
              {article.authorId === currentUser.id && (
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteArticle(article.id)}
                  type="button">
                  <Icons.Trash /> Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleList;
