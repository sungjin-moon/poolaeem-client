import { useState, useEffect, useCallback } from "react";
import { produce } from "immer";

const initialToast = {
  message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  status: "noti",
};

export type Toast = {
  message: string;
  status: string;
};

function useToast() {
  const [list, setList] = useState<Toast[]>([]);

  const onPush = (toast = initialToast) => {
    return setList((prevToasts) => {
      const nextToasts = produce(prevToasts, (draftToasts) => {
        draftToasts.push(toast);
      });
      return nextToasts;
    });
  };

  const onClose = (index: number) => {
    return setList((prevToasts) => {
      const nextToasts = produce(prevToasts, (draftToasts) => {
        draftToasts.splice(index, 1);
      });
      return nextToasts;
    });
  };

  const onClear = () => {
    return setList([]);
  };

  useEffect(() => {
    return () => {
      onClear();
    };
  }, []);

  return { list, onPush, onClose, onClear };
}

export default useToast;
