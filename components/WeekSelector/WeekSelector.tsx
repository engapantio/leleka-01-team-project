'use client';

import { useEffect, useRef } from 'react';
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
  const totalWeeks = 42;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  const containerRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const { onMouseDown, onMouseLeave, onMouseUp, onMouseMove } =
    useDragScroll<HTMLUListElement>('horizontal', containerRef);

  // Автоматичний скрол до вибраного тижня
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const weekToScroll = selectedWeek ?? currentWeek;
    if (!weekToScroll) return;

    if (weekToScroll < 5) {
      container.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
      return;
    }

    const targetIndex = Math.min(weekToScroll - 1, weeks.length - 1);
    const targetElement = itemRefs.current[targetIndex];

    if (targetElement) {
      const offsetLeft = targetElement.offsetLeft;
      const containerWidth = container.offsetWidth;
      const scrollLeft = Math.max(0, offsetLeft - containerWidth / 2);

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [selectedWeek, currentWeek, weeks.length]);

  // Обробка кліку на тиждень
  const handleWeekClick = (weekNumber: number) => {
    if (currentWeek !== null && weekNumber > currentWeek) {
      return;
    }

    if (weekNumber === selectedWeek) {
      return;
    }

    if (setActiveTab) {
      setActiveTab();
    }

    onSelectedWeek(weekNumber);
  };

  return (
    <ul
      className={css.container}
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {weeks.map((weekNumber, index) => {
        const isCurrentWeek = currentWeek === weekNumber;
        const isSelectedWeek = selectedWeek === weekNumber;
        const isFutureWeek = currentWeek !== null && weekNumber > currentWeek;

        return (
          <li
            key={weekNumber}
            ref={el => {
              itemRefs.current[index] = el;
            }}
          >
            <button
              className={clsx(
                css.week_box,
                isCurrentWeek && css.current,
                isSelectedWeek && css.active
              )}
              disabled={isFutureWeek}
              type="button"
              onClick={() => handleWeekClick(weekNumber)}
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
