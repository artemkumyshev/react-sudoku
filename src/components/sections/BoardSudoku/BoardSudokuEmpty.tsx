import React from 'react';

import { CellSudoku } from '@/@types';

import styles from './BoardSudoku.module.scss';

interface Props {
  grid: CellSudoku[][];
}

const BoardSudokuEmpty: React.FC<Props> = ({ grid }) => (
  <div className={styles.board}>
    {grid.map((row, i) => (
      <div key={i} className={styles.row}>
        {row.map((cell, j) => (
          <div key={j} className={styles.cell}>
            <button disabled className={styles.button}>
              {null}
            </button>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default BoardSudokuEmpty;
