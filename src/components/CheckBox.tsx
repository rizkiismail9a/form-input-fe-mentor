import { useState } from "react";
import "./check-box.css";

type CheckBoxProps = {
  name: string;
  label: string;
  value: string;
  onUpdateValue: (agree: boolean) => void;
};

export const CheckBox = ({
  name,
  label,
  value,
  onUpdateValue,
}: CheckBoxProps) => {
  const [agreement, setAgreement] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreement(event.target.checked);
    onUpdateValue(event.target.checked);
  };

  window.addEventListener("reset-form", () => {
    setAgreement(false);
  });

  return (
    <label
      className="checkbox-label"
      aria-label="checkbox label"
      data-section="input-checkbox"
      htmlFor={`checkbox-${label.toLocaleLowerCase().split(" ").join("-")}`}
    >
      <input
        name={name}
        type="checkbox"
        value={value}
        id={`checkbox-${label.toLocaleLowerCase().split(" ").join("-")}`}
        checked={agreement}
        required
        onChange={handleCheckboxChange}
      />
      <div className={`custom-checkbox ${agreement ? "checked-checkbox" : ""}`}>
        <i className="fa-solid fa-check"></i>
      </div>
      <div>
        {label} <span className="asteric">*</span>
      </div>
    </label>
  );
};
