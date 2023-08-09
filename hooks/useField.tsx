import { useState, useReducer, useCallback, ReactElement } from "react";

import useValidation from "./useValidation";

interface Item {
  key?: string;
  required: boolean;
  status: string;
  value: any;
  placeholder: string;
  message: string;
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

  const onChange = (item: Item) => {
    const nextItem = onCheck(item);
    setItem(nextItem);
  };

  return {
    item,
    onChange,
  };
}

export default useField;
