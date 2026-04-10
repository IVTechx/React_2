import styles from "./Header.module.css";

const Header = ({
  title = "Welcome Back",
  content = "Sign in to access your personal dashboard",
}: {
  title?: string;
  content?: string;
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>{content}</p>
      <div className={styles.underline} />
    </div>
  );
};

export default Header;
