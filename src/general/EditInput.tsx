import { useState } from "react";

type Value = string | null;

export const EditInput = ({
  savedValue,
  onSubmitValue,
  cancelEditing,
  editing,
}: {
  savedValue: Value;
  onSubmitValue: (val: string) => void;
  cancelEditing: () => void;
  editing: boolean;
}) => {
  const [value, setValue] = useState(savedValue || "");

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmitValue(value);
      cancelEditing();
      e.preventDefault();
    }

    if (e.key === "Escape") {
      cancelEditing();
      e.preventDefault();
    }
  };

  const saveValue = () => {
    onSubmitValue(value);
    cancelEditing();
  };

  return (
    <div>
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={saveValue}
        disabled={!editing}
      />
    </div>
  );
};
