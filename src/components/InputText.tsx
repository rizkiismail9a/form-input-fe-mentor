import { useEffect, useState } from "react";
import "./input-text.css";

type Props = {
  inputType: string;
  label: string;
  isInvalid: boolean;
  onUpdateValue: (value: string) => void;
};

export const InputText = ({
  inputType,
  label,
  isInvalid,
  onUpdateValue,
}: Props) => {
  const [validate, setValidate] = useState<boolean>(false);

  // Update the value of the input text
  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onUpdateValue(value);
    setValidate(false); // Reset validation state on user input
  };

  useEffect(() => setValidate(isInvalid), [isInvalid]);

  return (
    <label htmlFor={`input-${label.trim().replace(" ", "")}`}>
      <div className="label-text">
        {label}
        <span className="asteric">*</span>
      </div>
      <div className={`input-text ${validate ? "invalid" : ""}`}>
        <input
          id={`input-${label.trim().replace(" ", "")}`}
          type="text"
          onChange={updateValue}
        />
      </div>
      {validate && inputType === "text" && (
        <div className="validator-message">This field is required</div>
      )}
      {validate && inputType === "email" && (
        <div className="validator-message">
          Please enter a valid email address
        </div>
      )}
    </label>
  );
};
