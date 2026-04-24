import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./signUpForm.module.css";
import useAuthStore from "../../../store/authStore";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const SignUpForm = () => {
  const [hideText, setHideText] = useState(false);

  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const closeModal = useAuthStore((state) => state.closeModal);
  const openAuth = useAuthStore((state) => state.openAuth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const profile = {
      email: data.email,
      userName: data.username,
      id: Date.now(),
      loginTime: new Date().toISOString(),
      isLoggedIn: true,
    };

    // Zustand handles storage + modal flow
    setUserProfile(profile);

    reset();
  };

  return (
    <div className={styles.modal}>
      {/* Close button */}
      <button className={styles.closeButton} onClick={closeModal}>
        &times;
      </button>

      <h2 className={styles.title}>Create Account</h2>
      <h4 className={styles.subtitle}>Join QuizMaster Pro to start creating AI-powered quizzes</h4>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div className={styles.field}>
          <input
            placeholder="Username"
            className={styles.input}
            {...register("username", {
              required: "Username is required",
              validate: (v) => v.trim() !== "" || "Cannot be empty",
            })}
          />
          {errors.username && <span className={styles.errorText}>{errors.username.message}</span>}
        </div>

        {/* Email */}
        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setHideText(!hideText)}>
              {hideText ? "Hide" : "Show"}
            </button>
          </div>

          {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        </div>

        {/* Submit */}
        <button type="submit" disabled={!isValid} className={styles.submitButton}>
          Create Account
        </button>
      </form>

      {/* Switch to login (Zustand version) */}
      <span onClick={() => openAuth("signin")} className={styles.switchLink}>
        Already have an account? Sign in
      </span>
    </div>
  );
};

export default SignUpForm;
