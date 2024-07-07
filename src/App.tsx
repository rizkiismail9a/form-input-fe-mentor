import { useState } from "react";
import "./App.css";
import { InputRadio } from "./components/InputRadio";
import { InputText } from "./components/InputText";
import { TextArea } from "./components/TextArea";
import { CheckBox } from "./components/CheckBox";

const ContactForm = () => {
  const [typedFirstName, setTypedFirstName] = useState<string>();
  const [typedLastName, setTypedLastName] = useState<string>();
  const [typedEmail, setTypedEmail] = useState<string>();
  const [typedMessage, setTypedMessage] = useState<string>();
  const [query, setQuery] = useState<string>();
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
    setQuery(event.target.value);
  };

  const getFirstName = (value: string) => {
    setTypedFirstName(value.trim());
  };

  const getLastName = (value: string) => {
    setTypedLastName(value.trim());
  };

  const getTextAreaValue = (value: string) => {
    setTypedMessage(value.trim());
  };

  const getAgreement = (value: boolean) => {
    setAgreement(value);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("First Name:", typedFirstName);
    console.log("Last Name:", typedLastName);
    console.log("Email:", typedEmail);
    console.log("Query:", query);
    console.log("Message:", typedMessage);
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
            onUpdateValue={setTypedEmail}
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
                chacked={query === item.value}
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
