import { useEffect, useState } from "react";
import "./text-area.css";

type Props = {
  label: string;
  isInvalid: boolean;
  onUpdateValue: (value: string) => void;
};

export const TextArea = ({ label, isInvalid, onUpdateValue }: Props) => {
  const [validMessage, setValidMessage] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    onUpdateValue(value);
    setValidMessage(!value.length);
  };

  useEffect(() => setValidMessage(isInvalid), [isInvalid]);

  return (
    <label htmlFor="message" className="text-area-warpper">
      <div>{label}</div>
      <textarea
        name="input-message"
        id="message"
        className={`${!validMessage ? "" : "invalid"}`}
        onChange={handleChange}
      ></textarea>
      {validMessage && (
        <div className="validator-message">This field is required</div>
      )}
    </label>
  );
};
