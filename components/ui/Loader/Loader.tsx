import React from 'react';
import { PropagateLoader } from 'react-spinners';

import css from './Loader.module.css';

interface SpinnerProps {
  loading?: boolean;
  size?: number;
  color?: string;
  cssOverride?: object;
}

function Loader({ loading, size }: SpinnerProps) {
  return (
    <div className={css.wrapper}>
      <PropagateLoader
        color="var(--color-scheme-accent)"
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
