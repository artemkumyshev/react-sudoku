/// <reference types="vite/client" />

type Cell = { value: number; block: number; isVisible: boolean };

type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert' | 'evil';

interface CellSudoku extends Cell {
  input?: number | null;
}

type SelectedCellSudoku = [row: number, col: number, block: number];

type ReactTagProps<T> = import('react').ComponentPropsWithRef<T>;

type Size = 'extraSmall' | 'small' | 'base' | 'large' | 'extraLarge';
