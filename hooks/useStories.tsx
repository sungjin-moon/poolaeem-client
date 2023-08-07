import { useState, useRef } from "react";

export interface Story {
  title: string;
  view: any;
}

const initialStories = [
  {
    title: "Title1",
    view: <div>Title1</div>,
  },
  {
    title: "Title2",
    view: <div>Title2</div>,
  },
  {
    title: "Title3",
    view: <div>Title3</div>,
  },
];

function useStories(stories: Array<Story> = initialStories) {
  const [isOpen, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);
  const el: any = swiperRef.current;
  const currentStory = stories[index] || null;

  const onOpen = () => {
    return setOpen(true);
  };

  const onClose = () => {
    return setOpen(false);
  };

  const onSlidePrev = () => {
    if (el) {
      const currentIndex = el.swiper.activeIndex;
      const nextIndex = currentIndex - 1;
      if (currentIndex === 0) {
        onClose();
        return;
      }
      setIndex(nextIndex);
      el.swiper.slidePrev();
    }
  };

  const onSlideNext = () => {
    if (el) {
      const currentIndex = el.swiper.activeIndex;
      const nextIndex = currentIndex + 1;
      if (currentIndex === stories.length - 1) {
        return;
      }
      setIndex(nextIndex);
      el.swiper.slideNext();
    }
  };

  return {
    swiperRef,
    currentStory,
    stories,
    isOpen,
    onOpen,
    onClose,
    onSlidePrev,
    onSlideNext,
  };
}

export default useStories;
