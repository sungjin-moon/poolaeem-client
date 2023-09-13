import { useEffect, useRef } from "react";

interface Payload {}

interface IUseInterval {
  (callback: () => void, timeout: number): void;
}

const useInterval: IUseInterval = (callback, timeout) => {
  const savedCallback = useRef<(() => void) | null>(null);
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    const id = window.setInterval(tick, timeout);
    return () => {
      return window.clearInterval(id);
    };
  }, [timeout]);
};

export default useInterval;
