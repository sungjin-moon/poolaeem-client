import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";

function useModal() {
  const [isOpen, setOpen] = useState(false);
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
    setStatus("fadeOut");
    return () => {};
  }, []);

  const onFadeIn = debounce(() => {
    if (status === "init") return;
    return setStatus("fadeIn");
  }, 200);

  const onFadeOut = debounce(() => {
    if (status === "init") return;
    return setOpen(false);
  }, 200);

  const onOpen = () => {
    if (status === "init") return;
    return setOpen(true);
  };

  const onClose = () => {
    if (status === "init") return;
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
