import { useState } from "react";
import Field from "./index";
import Input from "../Input/Basic";

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

function SingleText({ className, label, item, onChange }: Props) {
  const [$value, $setValue] = useState("");

  const onChangeValue = (value: string) => {
    if (item.maxLength && value.length > item.maxLength) return;
    onChange ? onChange({ ...item, value }) : $setValue(value);
  };

  return (
    <Field
      className={`Field_SingleText ${className}`}
      label={label}
      required={item.required}
      message={item.message}
      currentLength={item.value.length}
      maxLength={item.maxLength}
    >
      <Input {...item} value={item.value || $value} onChange={onChangeValue} />
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

SingleText.defaultProps = defaultProps;

export default SingleText;
