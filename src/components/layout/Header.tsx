import styles from "./header.module.css";
import { Icons } from "../ui/Icons";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Header = () => {
  // Get state and actions directly from the store
  const userProfile = useAuthStore((state) => state.userProfile);
  const openAuth = useAuthStore((state) => state.openAuth);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className={styles.container}>
      <header className={styles.navbar}>
        <div className={styles.leftNavbar}>
          <Icons.brain className={styles.logo} />
          <p className={styles.name}>QuizMaster Pro</p>
        </div>

        <nav className={styles.rightNavbar}>
          {userProfile?.isLoggedIn ? (
            <div className={styles.loggedInGroup}>
              <Link to="/search" className={styles.navLink}>
                <Icons.search className={styles.navIcon} />
                Browse Quizzes
              </Link>

              <span className={styles.welcome}>
                Welcome, <strong>{userProfile.userName}</strong>!
              </span>

              <button onClick={logout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.loggedOutGroup}>
              <button className={styles.login} onClick={() => openAuth("signin")}>
                Login
              </button>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
