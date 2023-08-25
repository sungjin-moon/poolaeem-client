import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";

function useModal(initialIsOpen = false) {
  const [isOpen, setOpen] = useState(initialIsOpen);
  const [status, setStatus] = useState("init");
  const [data, setData] = useState<any>({});
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen === true) {
      onFadeIn();
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (status === "fadeOut") {
      onFadeOut();
    }
  }, [status]);

  useEffect(() => {
    return () => {};
  }, []);

  const onFadeIn = debounce(() => {
    return setStatus("fadeIn");
  }, 200);

  const onFadeOut = debounce(() => {
    return setOpen(false);
  }, 200);

  const onOpen = (updateData: object | undefined = undefined) => {
    if (updateData) setData(updateData);
    return setOpen(true);
  };

  const onClose = () => {
    return setStatus("fadeOut");
  };

  return {
    ref,
    data,
    isOpen,
    status,
    onFadeIn,
    onFadeOut,
    onOpen,
    onClose,
  };
}

export default useModal;
