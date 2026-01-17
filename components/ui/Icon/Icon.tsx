// Icon

import css from './Style.module.css';

type IconProps = {
  name: string;
  width?: number;
  height?: number;
  style?: object;
  color?: string;
  action?: () => void;
};

export const Icon = ({
  name,
  width = 24,
  height = 24,
  style,
  color = 'currentColor',
  action,
}: IconProps) => (
  <svg
    width={width}
    height={height}
    fill={color}
    style={style}
    aria-hidden="true"
    onClick={() => action?.()}
    className={css.icon}
  >
    <use href={`/sprite.svg#${name}`} />
  </svg>
);
