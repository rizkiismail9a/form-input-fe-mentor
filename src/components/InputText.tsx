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
  const [inValidateText, setInValidateText] = useState<boolean>(false);

  // Update the value of the input text
  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onUpdateValue(value);
    setInValidateText(!value.length); // Reset validation state on user input
  };

  useEffect(() => setInValidateText(isInvalid), [isInvalid]);

  return (
    <label htmlFor={`input-${label.trim().replace(" ", "")}`}>
      <div>{inValidateText.toString()}</div>
      <div>{isInvalid.toString()}</div>
      <div className="label-text">
        {label}
        <span className="asteric">*</span>
      </div>
      <div className={`input-text ${inValidateText ? "invalid" : ""}`}>
        <input
          id={`input-${label.trim().replace(" ", "")}`}
          type="text"
          onChange={updateValue}
        />
      </div>
      {inValidateText && inputType === "text" && (
        <div className="validator-message">This field is required</div>
      )}
      {inValidateText && inputType === "email" && (
        <div className="validator-message">
          Please enter a valid email address
        </div>
      )}
    </label>
  );
};
