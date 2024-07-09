import { useState } from "react";
import "./App.css";
import { InputRadio } from "./components/InputRadio";
import { InputText } from "./components/InputText";
import { TextArea } from "./components/TextArea";
import { CheckBox } from "./components/CheckBox";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { InputEmail } from "./components/InputEmail";
import { RegValidation } from "./types/validationTemplate";

type FormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  query?: string;
};

export type ErrorValidator = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  message: boolean;
  query: boolean;
};

const ContactForm = () => {
  const methods = useForm();
  const [formValues, setFormValues] = useState<FormValues>();
  const [agreement, setAgreement] = useState<boolean>(false);
  const [error, setError] = useState<ErrorValidator>({
    firstName: false,
    lastName: false,
    email: false,
    message: false,
    query: false,
  });

  const inputTextValidation = {
    required: {
      value: true,
      message: "This field is requierd",
    } as RegValidation<boolean>,
  };

  const queryOptions: InputRadio[] = [
    {
      name: "query-type",
      label: "General Enquiry",
      value: "general-enquiry",
    },
    {
      name: "query-type",
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

  const selectQueryType = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setError({ ...error, query: false });
    setFormValues({ ...formValues, query: event.target.value });
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
              {queryOptions.map((item) => (
                <InputRadio
                  key={item.value}
                  name={item.name}
                  label={item.label}
                  value={item.value}
                  chacked={formValues?.query === item.value}
                  onChange={selectQueryType}
                />
              ))}
            </div>
            {error.query && (
              <div className="query-err-message">
                Please select a query type
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
