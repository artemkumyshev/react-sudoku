import cn from 'classnames';
import React from 'react';
import { createPortal } from 'react-dom';
import { HiPlay } from 'react-icons/hi2';

import { CellSudoku, SelectedCellSudoku } from '@/@types';
import GameOverModal from '@/components/modals/GameOverModal';

import BoardSudoku, { BoardSudokuEmpty } from '@/components/sections/BoardSudoku';

// Components
import NumericKeyboard from '@/components/sections/NumericKeyboard';
import Timer, { Variants } from '@/components/sections/Timer';
import Winning from '@/components/sections/Winning';
import Button from '@/components/ui/Button';
import Sudoku, { DifficultyLevel } from '@/utils/modules/Sudoku';

// Styles
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  const [isWin, setIsWin] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState<DifficultyLevel>('easy');
  const [gridSudoku, setGridSudoku] = React.useState<CellSudoku[][]>([]);
  const [selectedCell, setSelectedCell] = React.useState<SelectedCellSudoku>([0, 0, 0]);
  const [variantTime, setVariantTime] = React.useState<Variants>(Variants.PLAY);
  const [mistakesCount, setMistakesCount] = React.useState(3);
  const [reloadGame, setReloadGame] = React.useState(0);
  const sudoku = new Sudoku(difficulty);

  React.useLayoutEffect(() => {
    const grid = sudoku.getGrid();
    const result: CellSudoku[][] = grid.map((row) => row.map((cell) => ({ ...cell, input: !cell.isVisible ? null : undefined })));

    setGridSudoku(result);

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        if (!result[i][j].isVisible) {
          setSelectedCell([i, j, result[i][j].block]);
          return;
        }
      }
    }
  }, [reloadGame]);

  React.useEffect(() => {
    const remainingCellsCounter = gridSudoku.flat().reduce((count, el) => {
      if (!el.isVisible && el.value !== el.input) {
        return count + 1;
      }
      return count;
    }, 0);

    if (gridSudoku.length > 1 && remainingCellsCounter === 0) {
      setIsWin(true);
      setVariantTime(Variants.PAUSE);
    }
  }, [gridSudoku]);

  const updateGridSudoku = (input: number) => {
    setGridSudoku((prevState) => {
      const newGrid = [...prevState];

      if (!newGrid[selectedCell[0]][selectedCell[1]].isVisible) {
        newGrid[selectedCell[0]][selectedCell[1]] = {
          ...newGrid[selectedCell[0]][selectedCell[1]],
          input
        };
      }

      return newGrid;
    });
  };

  const findNextPreviousVisibleCell = (row: number, col: number): { next: SelectedCellSudoku | null; prev: SelectedCellSudoku | null; default: SelectedCellSudoku | null } => {
    let next: SelectedCellSudoku | null = null;
    let prev: SelectedCellSudoku | null = null;
    let defaultCell: SelectedCellSudoku | null = null;

    for (let i = row; i < gridSudoku.length; i++) {
      for (let j = i === row ? col + 1 : 0; j < gridSudoku[i].length; j++) {
        const item = gridSudoku[i][j];
        if (item.isVisible === false) {
          next = [i, j, item.block];
          break;
        }

        if (defaultCell === null) {
          defaultCell = [i, j, item.block];
        }
      }

      if (next) {
        break;
      }

      if (i === gridSudoku.length - 1) {
        i = -1;
      }
    }

    for (let i = row; i >= 0; i--) {
      for (let j = i === row ? col - 1 : gridSudoku[i].length - 1; j >= 0; j--) {
        const item = gridSudoku[i][j];
        if (item.isVisible === false) {
          prev = [i, j, item.block];
          break;
        }

        if (defaultCell === null) {
          defaultCell = [i, j, item.block];
        }
      }
      if (prev) {
        break;
      }

      if (i === 0) {
        i = gridSudoku.length;
      }
    }

    return { next, prev, default: defaultCell };
  };

  const handleNewGame = () => {
    setReloadGame((prev) => prev + 1);
    setMistakesCount(0);
    setSelectedCell([0, 0, 0]);
    setIsWin(false);
    setVariantTime(Variants.RESTART);
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.difficulty}>
              <div className={styles.difficulty__title}>Difficulty:</div>
              <div className={styles.difficulty__list}>
                {(['easy', 'medium', 'hard', 'expert', 'evil'] as const).map((item) => (
                  <button
                    key={item}
                    className={cn({ 'text-blue-500': item === difficulty })}
                    onClick={() => {
                      setDifficulty(item);
                      handleNewGame();
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.mistakes}>Mistakes: {mistakesCount}/3</div>
            <div className={styles.timer} style={{ pointerEvents: isWin ? 'none' : undefined }}>
              <Timer getVariant={setVariantTime} time={1 * 60} variant={variantTime} />
            </div>
          </div>
          <div className={styles.board}>
            {isWin === false ? (
              variantTime === Variants.PAUSE ? (
                <div className={styles['board-empty']}>
                  <BoardSudokuEmpty grid={gridSudoku} />
                  <div className={styles['board-empty__layout']} />
                  <button className={styles['board-empty__play']} onClick={() => setVariantTime(Variants.PLAY)}>
                    <HiPlay />
                  </button>
                </div>
              ) : (
                <BoardSudoku grid={gridSudoku} selectedCell={selectedCell} setSelectedCell={(selected) => setSelectedCell(selected)} />
              )
            ) : (
              <Winning description={`You won the game on "${difficulty}" difficulty`} title='Excellent!' />
            )}
          </div>
          <div className={styles.panel}>
            <Button appearance='primary' className={styles['button-start']} size='lg' onClick={handleNewGame}>
              New Game
            </Button>
            <NumericKeyboard
              isAllDisable={variantTime !== Variants.PLAY}
              setSelectedNumber={(input) => updateGridSudoku(input)}
              onClickNext={() => {
                const { next } = findNextPreviousVisibleCell(selectedCell[0], selectedCell[1]);

                if (next) {
                  setSelectedCell(next);
                }
              }}
              onClickPrev={() => {
                const { prev } = findNextPreviousVisibleCell(selectedCell[0], selectedCell[1]);

                if (prev) {
                  setSelectedCell(prev);
                }
              }}
            />
          </div>
        </div>
      </div>
      {/* {isVisibleModalNewGame &&
        createPortal(
          <GameOverModal
            title="Game Over"
            description="You have made 3 mistakes and lost this game"
            onClickButtonChance={() => {}}
            onClickButtonNewGame={() => {
              handleNewGame();
              setIsVisibleModalNewGame(false);
            }}
          />,
          document.body
        )} */}
      {variantTime === Variants.ENDTIME &&
        createPortal(
          <GameOverModal
            description='You ran out of time and lost this game'
            title='Game Over'
            onClickButtonChance={() => {
              setVariantTime(Variants.RESTART);
            }}
            onClickButtonNewGame={() => {
              handleNewGame();
            }}
          />,
          document.body
        )}
    </>
  );
};

export default HomePage;
