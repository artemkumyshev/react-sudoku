export const display = ['1', '2', '3', '4', '5', '6'] as const;
export const size = ['small', 'extrasmall', 'base', 'large', 'extralarge'] as const;
export const weight = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'] as const;
type Display = (typeof display)[number];
type Size = (typeof size)[number];
export type Weight = (typeof weight)[number];

type DisplayType = {
  display: Display;
  text?: never;
};

type TextType = {
  text: Size;
  display?: never;
};

type CommonTypographyProps<E extends React.ElementType = React.ElementType> = (DisplayType | TextType) & {
  weight?: Weight;
  as?: E;
  children: React.ReactNode;
  className?: string;
};

export type Props<E extends React.ElementType> = CommonTypographyProps<E> & Omit<React.ComponentProps<E>, keyof CommonTypographyProps>;
