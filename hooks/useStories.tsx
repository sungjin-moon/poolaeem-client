import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";

function useStories(initialIsOpen = false) {
  const initialStories = [
    { title: "Title1", data: {} },
    { title: "Title2", data: {} },
    { title: "Title3", data: {} },
    { title: "Title4", data: {} },
    { title: "Title5", data: {} },
    { title: "Title6", data: {} },
  ];
  const [stories, setStories] = useState(initialStories);
  const [isOpen, setOpen] = useState(initialIsOpen);

  const onOpen = () => {
    return setOpen(true);
  };

  const onClose = () => {
    return setOpen(false);
  };

  return {
    stories,
    isOpen,
    onOpen,
    onClose,
  };
}

export default useStories;
