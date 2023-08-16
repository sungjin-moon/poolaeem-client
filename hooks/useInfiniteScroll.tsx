import { useRef } from "react";

function useInfiniteScroll() {
  const ref = useRef(null);

  const onScrollBottom = (action = () => {}, out = () => {}, options = {}) => {
    const element: any = ref.current;

    const callback = (entries: any) => {
      if (entries[0].isIntersecting === true) {
        return action();
      }
      if (entries[0].isIntersecting === false) {
        return out();
      }
    };

    if (element) {
      var intersectionObserver = new IntersectionObserver(callback, options);
      intersectionObserver.observe(element);
    }
    return () => {
      if (intersectionObserver) {
        intersectionObserver.unobserve(element);
      }
    };
  };

  return {
    ref,
    onScrollBottom,
  };
}

export default useInfiniteScroll;
