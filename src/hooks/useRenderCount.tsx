import { useRef, useEffect } from "react";

const useRenderCount = () => {
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return count.current;
};

export default useRenderCount;
