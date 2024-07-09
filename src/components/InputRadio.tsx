import { useState } from "react";
import "./input-radio.css";

export type InputRadio = {
  name: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export const InputRadio = ({ name, options, onChange }: InputRadio) => {
  const [selectedQuery, setSelectedQuery] = useState<string>();

  const selectQueryType = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedQuery(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="radio-container">
      {options.map((item) => (
        <div
          key={item.value}
          className={`radio-wrapper ${
            selectedQuery === item.value ? "selected" : ""
          }`}
        >
          <label
            htmlFor={`radio-${item.label
              .replace(" ", "-")
              .toLocaleLowerCase()}`}
            className="radio-label"
          >
            <input
              id={`radio-${item.label.replace(" ", "-").toLocaleLowerCase()}`}
              className="hidden-radio"
              type="radio"
              name={name}
              checked={selectedQuery === item.value}
              onChange={selectQueryType}
              value={item.value}
            />
            <span className="custom-radio">
              <span
                className={selectedQuery === item.value ? "checked-span" : ""}
              ></span>
            </span>
            <div className="label">{item.label}</div>
          </label>
        </div>
      ))}
    </div>
  );
};
