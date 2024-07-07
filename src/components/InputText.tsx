import "./input-text.css";

type Props = {
  inputType: string;
  label: string;
  onUpdateValue: (value: string) => void;
};
export const InputText = ({ inputType, label, onUpdateValue }: Props) => {
  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateValue(event.target.value);
  };

  return (
    <label htmlFor={`input-${label.trim().replace(" ", "")}`}>
      <div className="label-text">
        {label}
        <span className="asteric">*</span>
      </div>
      <div className="input-text">
        <input
          id={`input-${label.trim().replace(" ", "")}`}
          type={inputType}
          onChange={updateValue}
          required
        />
      </div>
    </label>
  );
};
