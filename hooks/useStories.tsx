import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";

function useStories(initialIsOpen = false) {
  const initialStories = [
    { title: "Title1", data: {} },
    { title: "Title2", data: {} },
  ];
  const [story, setStory] = useState(initialStories);
  const [isOpen, setOpen] = useState(initialIsOpen);

  const onOpen = () => {
    return setOpen(true);
  };

  const onClose = () => {
    return setOpen(false);
  };

  return {
    story,
    isOpen,
    onOpen,
    onClose,
  };
}

export default useStories;
