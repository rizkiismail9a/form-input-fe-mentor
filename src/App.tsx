import { useState } from "react";
import "./App.css";
import { InputRadio } from "./components/InputRadio";
import { InputText } from "./components/InputText";
import { TextArea } from "./components/TextArea";
import { CheckBox } from "./components/CheckBox";

type FormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  query?: string;
};

const ContactForm = () => {
  // const [typedFirstName, setTypedFirstName] = useState<string>();
  // const [typedLastName, setTypedLastName] = useState<string>();
  // const [typedEmail, setTypedEmail] = useState<string>();
  // const [typedMessage, setTypedMessage] = useState<string>();
  // const [query, setQuery] = useState<string>();
  const [formValues, setFormValues] = useState<FormValues>();
  const [agreement, setAgreement] = useState<boolean>(false);

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

  const selectQueryType = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormValues({ ...formValues, query: event.target.value });
  };

  const getFirstName = (value: string) => {
    setFormValues({ ...formValues, firstName: value.trim() });
  };

  const getLastName = (value: string) => {
    setFormValues({ ...formValues, lastName: value.trim() });
  };

  const getEmail = (value: string) => {
    setFormValues({ ...formValues, email: value.trim() });
  };

  const getTextAreaValue = (value: string) => {
    setFormValues({ ...formValues, message: value.trim() });
  };

  const getAgreement = (value: boolean) => {
    setAgreement(value);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("First Name:", formValues?.firstName);
    console.log("Last Name:", formValues?.lastName);
    console.log("Email:", formValues?.email);
    console.log("Query:", formValues?.query);
    console.log("Message:", formValues?.message);
  };

  return (
    <div id="card">
      <div className="header">Contact Us</div>
      <form onSubmit={submitForm}>
        <div className="name">
          <InputText
            inputType="text"
            label="First Name"
            onUpdateValue={getFirstName}
          />
          <InputText
            inputType="text"
            label="Last Name"
            onUpdateValue={getLastName}
          />
        </div>
        <div className="email">
          <InputText
            inputType="email"
            label="Email Address"
            onUpdateValue={getEmail}
          />
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
        </div>
        <TextArea label="Message" onUpdateValue={getTextAreaValue} />
        <CheckBox
          label="I consent to being contacted by the team"
          value="agree"
          onUpdateValue={getAgreement}
        />
        <button
          disabled={!agreement}
          className={`submit-button ${!agreement ? "disabled" : ""}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
