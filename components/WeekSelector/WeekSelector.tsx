import { useEffect, useRef } from 'react';
import css from './WeekSelector.module.css';
import clsx from 'clsx';
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
}: WeekSelectorProps) => {
  const totalWeeks = 42;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  const containerRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const weekToScroll = selectedWeek ?? currentWeek;
    const targetIndex = Math.min(weekToScroll ?? 5, weeks.length - 1);
    const targetElement = itemRefs.current[targetIndex];

    if (weekToScroll != null && weekToScroll < 5) {
      container.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
      return;
    }

    if (targetElement) {
      const offsetLeft = targetElement.offsetLeft;
      const containerWidth = container.offsetWidth;
      const scrollLeft = Math.max(0, offsetLeft - containerWidth);

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [selectedWeek, currentWeek, weeks.length]);

  const { onMouseDown, onMouseLeave, onMouseUp, onMouseMove } =
    useDragScroll<HTMLUListElement>('horizontal', containerRef);

  return (
    <ul
      className={css.container}
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {weeks.map((weekNumber, index) => (
        <li
          key={weekNumber}
          ref={el => {
            itemRefs.current[index] = el;
          }}
        >
          <button
            className={clsx(
              css.week_box,
              (selectedWeek || currentWeek) === weekNumber && css.active
            )}
            disabled={currentWeek !== null ? currentWeek < weekNumber : true}
            type="button"
            onClick={() => {
              if (currentWeek !== null && weekNumber <= currentWeek) {
                onSelectedWeek(weekNumber);
              }
            }}
          >
            <span className={css.numm}>{weekNumber}</span>
            <span className={css.week}>Тиждень</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default WeekSelector;
