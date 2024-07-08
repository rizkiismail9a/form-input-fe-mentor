import "./text-area.css";

type Props = {
  label: string;
  onUpdateValue: (value: string) => void;
};

export const TextArea = ({ label, onUpdateValue }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateValue(event.target.value);
  };

  return (
    <label htmlFor="message" className="text-area-warpper">
      <div>{label}</div>
      <textarea
        name="input-message"
        id="message"
        onChange={handleChange}
      ></textarea>
    </label>
  );
};
