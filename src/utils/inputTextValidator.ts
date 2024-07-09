import { FieldErrors, FieldValues } from "react-hook-form";

// The type could be required, maxLength, and so on, see the docs here
// https://react-hook-form.com/docs

type ErrorField = { message: string; type: string };

const findInputError = (
  errors: FieldErrors<FieldValues>,
  name: string
): { [key: string]: ErrorField } => {
  const keys = Object.keys(errors);

  return keys
    .filter((key) => key.includes(name))
    .reduce((cur, key) => {
      return Object.assign(cur, { error: errors[key] });
    }, {});
};

export { findInputError };
