import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./signInForm.module.css";
import useAuthStore from "../../../store/authStore";

type FormData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const [hideText, setHideText] = useState(false);

  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const closeModal = useAuthStore((state) => state.closeModal);
  const openAuth = useAuthStore((state) => state.openAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // Extracting username safely
    const emailPrefix = data.email.split("@")[0];

    const profile = {
      email: data.email,
      userName: emailPrefix || "User", // Fallback if split fails
      id: Date.now(),
      loginTime: new Date().toISOString(),
      isLoggedIn: true,
    };

    // This updates the Zustand store AND the localStorage
    setUserProfile(profile);
  };

  return (
    <div className={styles.modal}>
      {/* Close button */}
      <button className={styles.closeButton} onClick={closeModal}>
        &times;
      </button>

      <h2 className={styles.title}>Sign In</h2>
      <h4 className={styles.subtitle}>Access your QuizMaster Pro account</h4>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div className={styles.field}>
          <div className={styles.passwordWrapper}>
            <input
              type={hideText ? "text" : "password"}
              placeholder="Password"
              className={styles.input}
              {...register("password", { required: "Password is required" })}
            />

            <button
              type="button"
              onClick={() => setHideText(!hideText)}
              className={styles.togglePassword}>
              {hideText ? "Hide" : "Show"}
            </button>
          </div>

          {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        </div>

        {/* Submit */}
        <button type="submit" disabled={!isValid} className={styles.submitButton}>
          Sign In
        </button>
      </form>

      {/* Switch to signup (Zustand version) */}
      <span onClick={() => openAuth("signup")} className={styles.switchLink}>
        Don't have an account? Sign up
      </span>
    </div>
  );
};

export default SignInForm;
