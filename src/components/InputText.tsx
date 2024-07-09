import { RegValidation } from "../types/validationTemplate";
import { findInputError, isFormInvalid } from "../utils";
import "./input-text.css";
import { useFormContext } from "react-hook-form";

type Props = {
  label: string;
  validation: {
    required: RegValidation<boolean>;
  };
};

export const InputText = ({ label, validation }: Props) => {
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
          type="text"
          data-section="input-text"
          {...register(label, validation)}
        />
      </div>
      {isInvalid && (
        <div className="validator-message">{inputError.error.message}</div>
      )}
    </label>
  );
};
