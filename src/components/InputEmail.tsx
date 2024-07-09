import { findInputError, isFormInvalid } from "../utils";
import "./input-text.css";
import { useFormContext } from "react-hook-form";

type Props = {
  label: string;
};

export const InputEmail = ({ label }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, label);
  const isInvalid = isFormInvalid(inputError);

  return (
    <label htmlFor={`input-${label.trim().replace(" ", "")}`}>
      <div className="label-text">
        {label}
        <span className="asteric">*</span>
      </div>

      <div className={`input-text ${isInvalid ? "invalid" : ""}`}>
        <input
          id={`input-${label.trim().replace(" ", "")}`}
          type="email"
          {...register(label, {
            required: {
              value: true,
              message: "This field is requierd",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          })}
        />
      </div>
      {isInvalid && (
        <div className="validator-message">{inputError.error.message}</div>
      )}
    </label>
  );
};
