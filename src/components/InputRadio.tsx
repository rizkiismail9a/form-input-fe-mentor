import "./input-radio.css";

export type InputRadio = {
  name: string;
  label: string;
  value: string;
  chacked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputRadio = ({
  name,
  label,
  value,
  chacked,
  onChange,
}: InputRadio) => {
  return (
    <div>
      <div className={`radio-wrapper ${chacked ? "selected" : ""}`}>
        <label
          htmlFor={`radio-${label.replace(" ", "-").toLocaleLowerCase()}`}
          className="radio-label"
        >
          <input
            id={`radio-${label.replace(" ", "-").toLocaleLowerCase()}`}
            className="hidden-radio"
            type="radio"
            name={name}
            checked={chacked}
            onChange={onChange}
            value={value}
          />
          <span className="custom-radio">
            <span className={chacked ? "checked-span" : ""}></span>
          </span>
          <div className="label">{label}</div>
        </label>
      </div>
    </div>
  );
};
