import React from 'react';
import cn from 'classnames';

// Props
import { Props, Weight } from './Typography.props';

// Styles
import styles from './Typography.module.scss';

const defaultElement = 'p';

const fontWeight: Record<Weight, string> = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black'
};

const Typography = <E extends React.ElementType = typeof defaultElement>({ weight = 'medium', display, text, as, className, children, ...props }: Props<E>) => {
  const TagName = as || defaultElement;

  return (
    <TagName
      className={cn(
        {
          [styles[`display_${display}`]]: display,
          [styles[`text_${text}`]]: text
        },
        fontWeight[weight],
        className
      )}
      {...props}
    >
      {children}
    </TagName>
  );
};

export default Typography;
