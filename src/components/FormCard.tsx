import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";
import Input from "./input";
import { useUserContext, type Person } from "../context/user-context";
import styles from "./FormCard.module.css";

const FormCard = () => {
  const { handleLogin } = useUserContext();
  const navigate = useNavigate();
  const [nameValue, setInputValue] = useState("");
  const [emailValue, setemailValue] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailLower = emailValue.trim().toLowerCase();
    const nameTrimmed = nameValue.trim();

    const savedUsersRaw = localStorage.getItem("all_registered_users");
    const savedUsers: Person[] = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];

    const existingUser = savedUsers.find(
      (u) => u.email.toLowerCase() === emailLower && u.name === nameTrimmed,
    );

    let personToLogin: Person;

    if (existingUser) {
      personToLogin = { ...existingUser };
      console.log("Welcome back! ID recovered:", personToLogin.id);
    } else {
      personToLogin = {
        id: Date.now(),
        name: nameTrimmed,
        email: emailLower,
      };

      const updatedUsers = [...savedUsers, personToLogin];
      localStorage.setItem("all_registered_users", JSON.stringify(updatedUsers));
      console.log("New account created with ID:", personToLogin.id);
    }

    handleLogin(personToLogin);
    navigate(`/user/${personToLogin.id}`);

    setInputValue("");
    setemailValue("");
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemailValue(e.target.value.trim());
  };

  const isDisabled = nameValue.trim() === "" || emailValue.trim() === "";

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input onChange={onNameChange} value={nameValue} name={"username"} />
      <Input onChange={onEmailChange} value={emailValue} name={"email"} />
      <Button name={"sign in"} isDisabled={isDisabled} />
    </form>
  );
};

export default FormCard;
