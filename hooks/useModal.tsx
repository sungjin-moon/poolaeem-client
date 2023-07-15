import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";

function useModal(initialIsOpen = false) {
  const [isOpen, setOpen] = useState(initialIsOpen);
  const [status, setStatus] = useState("init");
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

  const onOpen = () => {
    return setOpen(true);
  };

  const onClose = () => {
    return setStatus("fadeOut");
  };

  return {
    ref,
    isOpen,
    status,
    onFadeIn,
    onFadeOut,
    onOpen,
    onClose,
  };
}

export default useModal;
