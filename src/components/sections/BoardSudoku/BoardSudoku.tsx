import cn from 'classnames';
import React from 'react';

// Helpers
import { compareArrays } from '@/utils/helpers/compareArrays';

// Styles
import styles from './BoardSudoku.module.scss';

interface Props {
  grid: CellSudoku[][];
  selectedCell?: SelectedCellSudoku;
  setSelectedCell: (cell: SelectedCellSudoku) => void;
}

const BoardSudoku: React.FC<Props> = ({ grid, selectedCell = [0, 0, 0], setSelectedCell }) => (
  <div className={styles.board}>
    {grid.map((row, i) => (
      <div key={i} className={styles.row}>
        {row.map((cell, j) => (
          <div
            key={j}
            className={cn(styles.cell, {
              [styles.cell_selected_col]: i === selectedCell[0],
              [styles.cell_selected_row]: j === selectedCell[1],
              [styles.cell_selected_block]: cell.block === selectedCell[2],
              [styles.cell_selected_button]: i === selectedCell[0] && j === selectedCell[1] && cell.block === selectedCell[2],
              [styles.cell_error]: cell.input ? cell.input !== cell.value : false
            })}
          >
            <button
              className={styles.button}
              disabled={cell.isVisible}
              onClick={() => {
                if (!compareArrays([selectedCell[0], selectedCell[1]], [i, j])) {
                  setSelectedCell([i, j, cell.block]);
                }
              }}
            >
              {cell.isVisible ? cell.value : cell.input || null}
            </button>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default BoardSudoku;
