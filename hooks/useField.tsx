import { useState, useReducer, useCallback, ReactElement } from "react";

import useValidation from "./useValidation";

export interface Item {
  key?: string;
  required: boolean;
  status: string;
  value: any;
  placeholder: string;
  message: string;
  maxLength?: undefined | number;
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

  const updateItem = (item: Item) => {
    setItem((prevItem) => {
      return {
        ...prevItem,
        ...item,
      };
    });
  };

  return {
    item,
    onChange,
    setValue,
    getValue,
    updateItem,
  };
}

export default useField;
