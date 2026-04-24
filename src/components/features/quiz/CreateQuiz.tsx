import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./createQuiz.module.css";
import { generateQuiz } from "./QuizGenerate";
import useQuizStore from "../../../store/useQuizStore";

interface CreateQuizProps {
  onClose: () => void;
}

interface FormValues {
  topic: string;
  language: string;
  count: string;
  difficulty: string;
  specialRequirements: string;
}

const CreateQuiz: React.FC<CreateQuizProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const addQuiz = useQuizStore((state) => state.addQuiz);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      topic: "",
      language: "English",
      count: "5",
      difficulty: "Medium",
      specialRequirements: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      //Generate the quiz via Gemini API
      const newQuizEntry = await generateQuiz(data);

      // USE THE STORE instead of manual localStorage
      addQuiz(newQuizEntry);

      // 3. Success!
      onClose();
      navigate(`/passquiz?id=${newQuizEntry.id}`);
    } catch (error: any) {
      console.error("Generation Error:", error);
      alert(`Failed to create quiz: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={styles.modalContent}
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create New Quiz</h2>
        <button type="button" onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
      </div>

      <p className={styles.subtitle}>Configure your AI-generated quiz parameters</p>

      <div className={styles.field}>
        <label className={styles.label}>Topic</label>
        <input
          {...register("topic", { required: "Topic is required" })}
          placeholder="e.g., JavaScript Fundamentals, World History, Biology"
          disabled={loading}
          className={styles.input}
        />
        {errors.topic && <span className={styles.errorText}>{errors.topic.message}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Language</label>
          <select {...register("language")} disabled={loading} className={styles.select}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinses">Chinses</option>
            <option value="Japenese">Japenese</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Difficulty</label>
          <select {...register("difficulty")} disabled={loading} className={styles.select}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Number of Questions</label>
        <select {...register("count")} disabled={loading} className={styles.select}>
          <option value="5">5 Questions</option>
          <option value="10">10 Questions</option>
          <option value="15">15 Questions</option>
          <option value="20">20 Questions</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Special Requirements (Optional)</label>
        <textarea
          {...register("specialRequirements")}
          placeholder="Any specific focus areas, question types, or requirements….."
          disabled={loading}
          className={styles.textarea}
        />
      </div>

      <button type="submit" className={styles.generateBtn} disabled={loading || !isValid}>
        {loading ? (
          <span className={styles.loaderGroup}>
            <span className={styles.spinnerSmall}></span>
            Generating Quiz...
          </span>
        ) : (
          "Generate Quiz"
        )}
      </button>
    </form>
  );
};

export default CreateQuiz;
