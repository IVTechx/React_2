import { useUserContext } from "../context/user-context";
import styles from "./Nav.module.css";
import { Icons } from "./Icons";

const Nav = () => {
  const { currentUser, handleLogout } = useUserContext();

  return (
    <header className={styles.header}>
      <div className={styles.navInner}>
        {/* Left: Logo */}
        <div className={styles.logo}>
          <Icons.Logo />
          <h2>Personal Dashboard</h2>
        </div>

        {/* Right: user info or prompt */}
        <div className={styles.right}>
          {currentUser ? (
            <>
              <p className={styles.message}>
                Welcome back,
                <strong>{currentUser.name}</strong>
              </p>
              <button onClick={handleLogout} className={styles.signoutBtn}>
                <Icons.Logout />
                Logout
              </button>
            </>
          ) : (
            <p className={styles.message}>Please log in to access your dashboard</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
