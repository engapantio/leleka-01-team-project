import { useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import css from './WeekSelector.module.css';
import { useDragScroll } from '@/hooks/useDragScroll';

interface WeekSelectorProps {
  currentWeek: number | null;
  selectedWeek: number | null;
  onSelectedWeek: (weekNumber: number) => void;
  setActiveTab?: () => void;
}

const WeekSelector = ({
  currentWeek,
  selectedWeek,
  onSelectedWeek,
  setActiveTab,
}: WeekSelectorProps) => {
  const weeks = useMemo(() => Array.from({ length: 42 }, (_, i) => i + 1), []);

  const containerRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const {
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
    didDrag,
    resetDragFlag,
  } = useDragScroll<HTMLUListElement>('horizontal', containerRef);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const weekToScroll = selectedWeek ?? currentWeek;
    if (!weekToScroll) return;

    if (weekToScroll < 5) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    const targetIndex = Math.min(
      Math.max(weekToScroll - 1, 0),
      weeks.length - 1
    );
    const targetElement = itemRefs.current[targetIndex];
    if (!targetElement) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    const currentScrollLeft = container.scrollLeft;
    const targetCenter =
      currentScrollLeft +
      (targetRect.left - containerRect.left) +
      targetRect.width / 2;

    container.scrollTo({
      left: Math.max(0, targetCenter - containerRect.width / 2),
      behavior: 'smooth',
    });
  }, [selectedWeek, currentWeek, weeks]);

  const handleSelect = (weekNumber: number) => {
    if (weekNumber === selectedWeek) return;
    setActiveTab?.();
    onSelectedWeek(weekNumber);
  };

  return (
    <ul
      className={css.container}
      ref={containerRef}
      onMouseDown={onMouseDown}
     onMouseLeave={() => {
  onMouseLeave();
  resetDragFlag();
}}
onMouseUp={() => {
  onMouseUp();
  setTimeout(() => resetDragFlag(), 0);
}}
      onMouseMove={onMouseMove}
    >
      {weeks.map((weekNumber, index) => {
        const isCurrentWeek = currentWeek === weekNumber;
        const isSelectedWeek = selectedWeek === weekNumber;
        const isFutureWeek =
          currentWeek !== null && weekNumber > currentWeek;

        return (
          <li
            key={weekNumber}
            className={css.item}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
          >
            <button
              className={clsx(
                css.week_box,
                isCurrentWeek && css.current,
                isSelectedWeek && css.active,
                isFutureWeek && css.disabled
              )}
              disabled={isFutureWeek}
              type="button"
              onClick={(e) => {
                if (didDrag()) {
                  e.preventDefault();
                  return;
                }
                if (!isFutureWeek) handleSelect(weekNumber);
              }}
            >
              <span className={css.numm}>{weekNumber}</span>
              <span className={css.week}>Тиждень</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default WeekSelector;
