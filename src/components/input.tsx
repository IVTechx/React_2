import { firstUpperChar } from "../lib/index";
import { Icons } from "./Icons";
import classess from "./input.module.css";

type InputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ onChange, value, name }: InputProps) => {
  const title = firstUpperChar(name);

  // Capitalize 'Icon' so React treats it as a component
  const Icon = name === "email" ? Icons.Email : Icons.Profile;

  return (
    <div className={classess.formPart}>
      <div className={classess.labelWrapper}>
        <Icon />
        <label className={classess.label} htmlFor={name}>
          {title}
        </label>
      </div>
      <input
        className={classess.input}
        onChange={onChange}
        value={value}
        type={name === "email" ? "email" : "text"}
        name={name}
        id={name}
        placeholder={`Enter your ${name}`}
      />
    </div>
  );
};

export default Input;
