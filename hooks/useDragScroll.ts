import { useRef, useCallback, useEffect } from 'react';

type ScrollDirection = 'horizontal' | 'vertical';

export const useDragScroll = <T extends HTMLElement>(
  direction: ScrollDirection = 'horizontal',
  propRef?: React.RefObject<T | null>
) => {
  const internalRef = useRef<T>(null);

  const ref = propRef ?? internalRef;

  const isDown = useRef(false);
  const start = useRef(0);
  const scrollStart = useRef(0);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      isDown.current = true;
      start.current =
        direction === 'horizontal'
          ? e.pageX - ref.current.offsetLeft
          : e.pageY - ref.current.offsetTop;
      scrollStart.current =
        direction === 'horizontal'
          ? ref.current.scrollLeft
          : ref.current.scrollTop;
    },
    [direction]
  );

  const onMouseLeave = useCallback(() => {
    isDown.current = false;
  }, []);

  const onMouseUp = useCallback(() => {
    isDown.current = false;
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDown.current || !ref.current) return;
      e.preventDefault();
      const current =
        direction === 'horizontal'
          ? e.pageX - ref.current.offsetLeft
          : e.pageY - ref.current.offsetTop;
      const walk = (current - start.current) * 1;
      if (direction === 'horizontal') {
        ref.current.scrollLeft = scrollStart.current - walk;
      } else {
        ref.current.scrollTop = scrollStart.current - walk;
      }
    },
    [direction]
  );

  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (!ref.current) return;
      if (direction === 'horizontal') {
        ref.current.scrollLeft += e.deltaY;
      } else {
        ref.current.scrollTop += e.deltaY;
      }
    },
    [direction]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [onWheel]);

  return {
    ref,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
  };
};
