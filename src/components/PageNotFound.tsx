import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user-context";
import styles from "./PageNotFound.module.css";

const PageNotFound = () => {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn } = useUserContext();

  const handleHome = () => {
    if (isLoggedIn && currentUser) {
      navigate(`/user/${currentUser.id}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.codeBlock}>
          <span className={styles.fourOhFour}>404</span>
        </div>
        <div className={styles.body}>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.description}>
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={handleHome}>
              {isLoggedIn ? "Back to Dashboard" : "Back to Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
