import cn from 'classnames';
import React from 'react';

// Styles
import styles from './NumericKeyboard.module.scss';

interface Props {
  setSelectedNumber: (number: number) => void;
  onClickPrev?: () => void;
  onClickNext?: () => void;
  isAllDisable?: boolean;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const NumericKeyboard: React.FC<Props> = ({ setSelectedNumber, onClickPrev = () => {}, onClickNext = () => {}, isAllDisable = false }) => (
  <ul className={styles.keyboard}>
    {numbers.map((number) => (
      <li key={number} className={styles.number}>
        <button className={styles.button} disabled={isAllDisable} onClick={() => setSelectedNumber(number)}>
          {number}
        </button>
      </li>
    ))}
    <li className={cn(styles.number, styles.number_half)}>
      <button className={styles.button} disabled={isAllDisable} onClick={onClickPrev}>
        Prev
      </button>
    </li>
    <li className={cn(styles.number, styles.number_half)}>
      <button className={styles.button} disabled={isAllDisable} onClick={onClickNext}>
        Next
      </button>
    </li>
  </ul>
);

export default NumericKeyboard;
