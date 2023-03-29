import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import Button from './Button';

import './Button.module.scss';

const meta: ComponentMeta<typeof Button> = {
  title: 'UI/Button',
  component: Button
};
export default meta;

export const Default: ComponentStoryObj<typeof Button> = {
  args: {
    appearance: 'primary',
    size: 'base',
    isRoundedFull: false,
    isWidthFull: false,
    children: 'Отправить'
  }
};
