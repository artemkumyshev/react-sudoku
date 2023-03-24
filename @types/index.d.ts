import { Cell } from '@/utils/modules/Sudoku';

interface CellSudoku extends Cell {
  input?: number | null;
}

type SelectedCellSudoku = [row: number, col: number, block: number];

type ReactTagProps<T> = import('react').ComponentPropsWithRef<T>;
