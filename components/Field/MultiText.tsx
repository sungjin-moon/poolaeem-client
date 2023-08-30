import { useState } from "react";
import Field from "./index";
import Textarea from "../Textarea/Basic";

type Item = {
  required: boolean;
  status: string;
  value: string;
  placeholder: string;
  message: string;
  maxLength?: undefined | number;
};

interface Props {
  className: string;
  label: string;
  item: Item;
  onChange: undefined | ((item: Item) => void);
}

function MultiText({ className, label, item, onChange }: Props) {
  const [$value, $setValue] = useState("");

  const onChangeValue = (value: string) => {
    if (item.maxLength && value.length > item.maxLength) return;
    onChange ? onChange({ ...item, value }) : $setValue(value);
  };

  return (
    <Field
      className={`Field_MultiText ${className}`}
      label={label}
      required={item.required}
      message={item.message}
      currentLength={item.value.length}
      maxLength={item.maxLength}
    >
      <Textarea
        {...item}
        value={item.value || $value}
        onChange={onChangeValue}
      />
    </Field>
  );
}

const defaultProps = {
  className: "",
  label: "Label",
  item: {
    required: true,
    status: "default",
    value: undefined,
    placeholder: "Placeholder",
    message: "",
  },
  onChange: undefined,
};

MultiText.defaultProps = defaultProps;

export default MultiText;
