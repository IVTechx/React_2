import { useState } from "react";
import Button from "./button";
import Input from "./input";
import { useUserContext, type Person } from "../context/user-context";
import styles from "./FormCard.module.css";

const FormCard = () => {
  const { handleLogin } = useUserContext();
  const [nameValue, setInputValue] = useState("");
  const [emailValue, setemailValue] = useState("");

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPerson: Person = {
      id: Date.now(),
      name: nameValue,
      email: emailValue,
      isSigned: true,
    };
    console.log(newPerson);
    handleLogin(newPerson);
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
