import cn from 'classnames';
import React from 'react';

import styles from './Button.module.scss';

interface Props extends Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
  children: React.ReactNode;
  appearance?: 'primary' | 'secondary';
  size?: 'base' | 'lg';
  className?: string;
}

const Button: React.FC<Props> = ({ appearance, size, children, className, ...props }) => (
  <button className={cn(styles.button, styles[`button_${appearance}`], styles[`button_${size}`], className)} {...props}>
    {children}
  </button>
);

export default Button;
