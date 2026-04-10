import FormCard from "./FormCard";
import Header from "./Header";
import { useUserContext } from "../context/user-context";
import styles from "./SignIn.module.css";

const SignInForm = () => {
  const { isLoggedIn } = useUserContext();

  if (isLoggedIn) return null;
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginHeader}>
        <Header />
      </div>
      <div className={styles.loginCard}>
        <FormCard />
      </div>
    </div>
  );
};
export default SignInForm;
