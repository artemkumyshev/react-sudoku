import cn from 'classnames';
import React from 'react';

import styles from './Button.module.scss';

interface Props extends Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
  children: React.ReactNode;
  appearance?: 'primary' | 'secondary';
  size?: Size;
  isRoundedFull?: boolean;
  isWidthFull?: boolean;
  className?: string;
}

const Button: React.FC<Props> = ({ appearance, size = 'base', children, isWidthFull, isRoundedFull, className, ...props }) => (
  <button
    className={cn(
      styles.button,
      { [styles[`button_appearance_${appearance}`]]: appearance, [styles[`button_size_${size}`]]: size, [styles.button_width_full]: isWidthFull, [styles.button_rounded_full]: isRoundedFull },
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
