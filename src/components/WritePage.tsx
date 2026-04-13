import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import ArticleEditor from "./ArticleEditor";
import ArticleList from "./ArticleList";
import styles from "./WritePage.module.css";
import { ArticlesProvider } from "../context/article-context";

const WritePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <ArticlesProvider>
      <div className={styles.pageWrapper}>
        <div className={styles.pageContent}>
          <div className={styles.topRow}>
            <Header title="Write an Article" content="" />
            <button className={styles.backBtn} onClick={() => navigate(`/user/${id}`)} type="button">
              ← Back to Dashboard
            </button>
          </div>
          <ArticleEditor />
          <ArticleList />
        </div>
      </div>
    </ArticlesProvider>
  );
};

export default WritePage;