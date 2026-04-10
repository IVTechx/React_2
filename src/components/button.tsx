import { firstUpperChar } from "../lib/index";
import classess from "./button.module.css";
import { useEffect, useState } from "react";

interface buttonType {
  name: string;
  isDisabled: boolean;
}

const Button = ({ name, isDisabled }: buttonType) => {
  const title = firstUpperChar(name);
  const [style, setStyle] = useState(classess.button);

  useEffect(() => {
    if (!isDisabled) {
      setStyle(`${classess.button} ${classess.active}`);
    } else {
      setStyle(`${classess.button}`);
    }
  }, [isDisabled]);

  return (
    <div className={classess.formPart}>
      <button className={style} disabled={isDisabled}>
        {title}
        <span>→</span>
      </button>
    </div>
  );
};

export default Button;
