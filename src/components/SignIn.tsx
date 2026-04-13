import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "./FormCard";
import Header from "./Header";
import { useUserContext } from "../context/user-context";
import styles from "./SignIn.module.css";

const SignInForm = () => {
  const { isLoggedIn, currentUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      navigate(`/user/${currentUser.id}`, { replace: true });
    }
  }, [isLoggedIn, currentUser, navigate]);

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
