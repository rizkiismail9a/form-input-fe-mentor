// Check if there is a single value in the error object to define the form validation
// The object could be empty
const isFormInvalid = (err: { [key: string]: string } | object): boolean => {
  if (Object.keys(err).length > 0) return true;
  return false;
};

export { isFormInvalid };
