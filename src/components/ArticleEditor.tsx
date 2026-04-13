import { useState } from "react";
import { useUserContext } from "../context/user-context";
import styles from "./WritePage.module.css";
import { useArticles, type Article } from "../context/article-context";

const ArticleEditor = () => {
  const { currentUser } = useUserContext();
  const { addArticle } = useArticles();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saved, setSaved] = useState(false);

  const isDisabled = !title.trim() || !body.trim();

  const handleSave = () => {
    if (isDisabled || !currentUser) return;

    const article: Article = {
      id: `article_${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      createdAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    addArticle(article);
    setTitle("");
    setBody("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    setTitle("");
    setBody("");
  };

  return (
    <div className={styles.editorCard}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="article-title">
          Title
        </label>
        <input
          id="article-title"
          className={styles.titleInput}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your article a title..."
          maxLength={120}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="article-body">
          Content
        </label>
        <textarea
          id="article-body"
          className={styles.bodyTextarea}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Start writing your article..."
          rows={10}
        />
      </div>

      <div className={styles.editorFooter}>
        <span className={styles.charCount}>{body.length} characters</span>
        <div className={styles.actions}>
          <button
            className={styles.cancelBtn}
            onClick={handleCancel}
            type="button"
            disabled={isDisabled}>
            Cancel
          </button>
          <button
            className={`${styles.saveBtn} ${isDisabled ? styles.saveBtnDisabled : ""}`}
            onClick={handleSave}
            disabled={isDisabled}
            type="button">
            {saved ? "✓ Saved!" : "Save Article"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
