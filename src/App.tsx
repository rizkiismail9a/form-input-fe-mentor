import "./App.css";
import { InputRadio } from "./components/InputRadio";
import { InputText } from "./components/InputText";
import { TextArea } from "./components/TextArea";
import { CheckBox } from "./components/CheckBox";
import {
  Controller,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { InputEmail } from "./components/InputEmail";
import { RegValidation } from "./types/validationTemplate";
import { findInputError, isFormInvalid } from "./utils";
import { ToastMessage } from "./components/ToastMessage";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export type ErrorValidator = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  message: boolean;
  query: boolean;
};

const ContactForm = () => {
  const methods = useForm();
  const { errors } = methods.formState;
  const [success, setSuccess] = useState<boolean>(false);
  const inputQueryError = findInputError(errors, "query");
  const inputCheckboxError = findInputError(errors, "checkbox");
  const isInvalid: boolean =
    isFormInvalid(inputCheckboxError) || isFormInvalid(inputQueryError);

  const inputTextValidation = {
    required: {
      value: true,
      message: "This field is requierd",
    } as RegValidation<boolean>,
  };

  const queryOptions = [
    {
      label: "General Enquiry",
      value: "general-enquiry",
    },
    {
      label: "Support Request",
      value: "support-request",
    },
  ];

  const resetEvent = new Event("reset-form");

  const textAreaValidation = {
    required: {
      value: true,
      message: "This field is requierd",
    } as RegValidation<boolean>,
    maxLength: {
      value: 30,
      message: "Max content is 30 characters",
    },
  };

  const submitForm = methods.handleSubmit((data: FieldValues) => {
    console.log(data);
    setSuccess(true);
    methods.reset();
    window.dispatchEvent(resetEvent);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  });

  return (
    <>
      <AnimatePresence>
        {success && (
          <ToastMessage message="Thanks for completing the form. We'll be in touch soon!" />
        )}
      </AnimatePresence>
      <div id="card">
        <div className="header">Contact Us</div>
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="name">
              <InputText label="First Name" validation={inputTextValidation} />
              <InputText label="Last Name" validation={inputTextValidation} />
            </div>
            <div className="email">
              <InputEmail label="Email Address" />
            </div>
            <div className="query-input">
              <div className="query-title">
                Query Type <span className="asteric">*</span>
              </div>
              <div className="query-type">
                <Controller
                  name="query"
                  control={methods.control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please select a query type",
                    },
                  }}
                  render={({ field }) => (
                    <InputRadio
                      name={field.name}
                      options={queryOptions}
                      onChange={field.onChange}
                    />
                  )}
                ></Controller>
              </div>
              {isInvalid && (
                <div className="query-err-message">
                  {inputQueryError.error?.message}
                </div>
              )}
            </div>
            <TextArea label="Message" validation={textAreaValidation} />
            <Controller
              name="checkbox"
              control={methods.control}
              rules={{
                required: {
                  value: true,
                  message:
                    "To submit this form, please consent to being contacted",
                },
              }}
              render={({ field }) => (
                <CheckBox
                  name={field.name}
                  label="I consent to being contacted by the team"
                  value="agree"
                  onUpdateValue={field.onChange}
                />
              )}
            ></Controller>
            {isInvalid && (
              <div className="check-err-message">
                {inputCheckboxError.error?.message}
              </div>
            )}

            <button onClick={submitForm} className="submit-button">
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default ContactForm;
