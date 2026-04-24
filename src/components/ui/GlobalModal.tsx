import useAuthStore from "../../store/authStore";
import CreateQuiz from "../features/quiz/CreateQuiz";
import SignInForm from "../features/auth/SignInForm";
import SignUpForm from "../features/auth/SignUpForm";
import styles from "./modal.module.css";
import { useEffect } from "react";

const GlobalModal = () => {
  const modal = useAuthStore((state) => state.modal);
  const authMode = useAuthStore((state) => state.authMode);
  const closeModal = useAuthStore((state) => state.closeModal);

  useEffect(() => {
    if (modal === "none") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modal, closeModal]);

  if (modal === "none") return null;

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}>
        {modal === "auth" && (authMode === "signin" ? <SignInForm /> : <SignUpForm />)}

        {modal === "createQuiz" && <CreateQuiz onClose={closeModal} />}
      </div>
    </div>
  );
};

export default GlobalModal;
