import React from 'react';

// Styles
import styles from './NumericKeyboard.module.scss';

interface Props {
  setSelectedNumber: (number: number) => void;
  onClickPrev?: () => void;
  onClickNext?: () => void;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const NumericKeyboard: React.FC<Props> = ({ setSelectedNumber, onClickPrev = () => {}, onClickNext = () => {} }) => (
  <div className={styles.keyboard}>
    <ul className={styles.numbers}>
      {numbers.map((number) => (
        <li key={number} className={styles.number}>
          <button className={styles.button} onClick={() => setSelectedNumber(number)}>
            {number}
          </button>
        </li>
      ))}
    </ul>
    <ul className={styles.keys}>
      <li className={styles.key}>
        <button className={styles.button} onClick={onClickPrev}>
          Prev
        </button>
      </li>
      <li className={styles.key}>
        <button className={styles.button} onClick={onClickNext}>
          Next
        </button>
      </li>
    </ul>
  </div>
);

export default NumericKeyboard;
