import { useRef, useCallback } from 'react';

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
  const hasMoved = useRef(false);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;

      const target = e.target as HTMLElement;
      // WeekSelector items are buttons, so we MUST allow drag start on buttons.
// Block only real form fields where dragging feels broken.
if (target.closest('input, textarea, select')) {
  return;
}

      isDown.current = true;
      hasMoved.current = false;

      start.current = direction === 'horizontal' ? e.clientX : e.clientY;
      scrollStart.current =
        direction === 'horizontal'
          ? ref.current.scrollLeft
          : ref.current.scrollTop;

      e.preventDefault();
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
      if (!isDown.current || !ref.current) return;

      const current = direction === 'horizontal' ? e.clientX : e.clientY;
      const delta = current - start.current;

      if (!hasMoved.current && Math.abs(delta) > 5) {
        hasMoved.current = true;
      }

      if (hasMoved.current) {
        e.preventDefault();
      }

      if (direction === 'horizontal') {
        ref.current.scrollLeft = scrollStart.current - delta;
      } else {
        ref.current.scrollTop = scrollStart.current - delta;
      }
    },
    [direction, ref]
  );

  const didDrag = useCallback(() => hasMoved.current, []);
  const resetDragFlag = useCallback(() => {
    hasMoved.current = false;
  }, []);

  return {
    ref,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
    didDrag,
    resetDragFlag,
  };
};
