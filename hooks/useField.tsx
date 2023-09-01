import { useEffect, useState } from "react";

import useValidation from "./useValidation";

export interface Item {
  key?: string;
  required: boolean;
  status: string;
  value: any;
  placeholder: string;
  message: string;
  maxLength?: undefined | number;
  maxSize?: undefined | number;
}

const initialItem = {
  key: "",
  required: true,
  status: "default",
  value: "",
  placeholder: "Placeholder",
  message: "",
};

function useField(customItem: Item = initialItem) {
  const [item, setItem] = useState<Item>({ ...initialItem, ...customItem });
  const { onCheck } = useValidation();

  const onChange = (item: Item, isCheck = true) => {
    let nextItem = item;

    if (isCheck === true) {
      nextItem = onCheck(item);
    }

    setItem(nextItem);
  };

  const onCheckValue = () => {
    const nextItem = onCheck(item);
    setItem(nextItem);
    return nextItem.status === "success";
  };

  const setValue = (value: any) => {
    setItem((prevItem) => {
      return {
        ...prevItem,
        value,
        status: "default",
        message: "",
      };
    });
  };

  const getValue = () => {
    return item.value;
  };

  const validator = (status: string, message: string) => {
    setItem((prevItem) => {
      return {
        ...prevItem,
        status,
        message,
      };
    });
  };

  return {
    item,
    onChange,
    onCheckValue,
    setValue,
    getValue,
    validator,
  };
}

export default useField;
