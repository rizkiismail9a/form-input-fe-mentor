import { useFormContext } from "react-hook-form";
import "./text-area.css";
import { RegValidation } from "../types/validationTemplate";
import { findInputError, isFormInvalid } from "../utils";

type Props = {
  label: string;
  validation: {
    required: RegValidation<boolean>;
    maxLength: RegValidation<number>;
  };
};

export const TextArea = ({ label, validation }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputError = findInputError(errors, label);
  const isInvalid = isFormInvalid(inputError);

  return (
    <label htmlFor="message" className="text-area-warpper">
      <div>{label}</div>
      <textarea
        id="message"
        className={`${!isInvalid ? "" : "invalid"}`}
        {...register(label, validation)}
      ></textarea>
      {isInvalid && (
        <div className="validator-message">{inputError.error.message}</div>
      )}
    </label>
  );
};
