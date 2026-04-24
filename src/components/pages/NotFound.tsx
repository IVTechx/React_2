import { useNavigate } from "react-router-dom";
import styles from "./notFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>Page Not Found</p>
      <button className={styles.button} onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
