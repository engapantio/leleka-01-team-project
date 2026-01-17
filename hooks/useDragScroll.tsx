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
      const element = ref.current;
      if (!element) return;
      isDown.current = true;
      start.current =
        direction === 'horizontal'
          ? e.pageX - element.offsetLeft
          : e.pageY - element.offsetTop;
      scrollStart.current =
        direction === 'horizontal'
          ? element.scrollLeft
          : element.scrollTop;
    },
    [direction, ref]
  );

  const onMouseLeave = useCallback(() => {
    isDown.current = false;
  }, []);

  const onMouseUp = useCallback(() => {
    isDown.current = false;
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const element = ref.current;
      if (!isDown.current || !element) return;
      e.preventDefault();
      const current =
        direction === 'horizontal'
          ? e.pageX - element.offsetLeft
          : e.pageY - element.offsetTop;
      const walk = (current - start.current) * 1;
      if (direction === 'horizontal') {
        element.scrollLeft = scrollStart.current - walk;
      } else {
        element.scrollTop = scrollStart.current - walk;
      }
    },
    [direction, ref]
  );

  const onWheel = useCallback(
    (e: WheelEvent) => {
      const element = ref.current;
      if (!element) return;
      if (direction === 'horizontal') {
        element.scrollLeft += e.deltaY;
        e.preventDefault();
        e.stopPropagation();
      } else {
        element.scrollTop += e.deltaY;
      }
    },
    [direction, ref]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [onWheel, ref]);

  return {
    ref,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
  };
};
