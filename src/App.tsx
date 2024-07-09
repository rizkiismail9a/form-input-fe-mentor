import { useState } from "react";
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

  const [agreement, setAgreement] = useState<boolean>(false);

  const inputError = findInputError(errors, "query");
  const isInvalid = isFormInvalid(inputError);

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

  const getAgreement = (value: boolean) => {
    setAgreement(value);
  };

  const submitForm = methods.handleSubmit((data: FieldValues) => {
    console.log(data);
  });

  return (
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
                {inputError.error.message}
              </div>
            )}
          </div>
          <TextArea label="Message" validation={textAreaValidation} />
          <CheckBox
            label="I consent to being contacted by the team"
            value="agree"
            onUpdateValue={getAgreement}
          />
          <button
            onClick={submitForm}
            disabled={!agreement}
            className={`submit-button ${!agreement ? "disabled" : ""}`}
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ContactForm;
