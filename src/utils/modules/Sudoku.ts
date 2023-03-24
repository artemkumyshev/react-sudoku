export type Cell = { value: number; block: number; isVisible: boolean };
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert' | 'evil';

export default class Sudoku {
  // private size = 9;
  private grid: Cell[][] = [];

  private difficulty: DifficultyLevel;

  private alloweNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(difficulty: DifficultyLevel = 'easy') {
    this.difficulty = difficulty;
  }

  public getGrid() {
    this.fillGrid();
    return this.grid;
  }

  private generateGrid() {
    for (let i = 0; i < 9; i++) {
      this.grid[i] = [];
      for (let j = 0; j < 9; j++) {
        this.grid[i][j] = { value: 0, isVisible: true, block: 0 };
      }
    }
  }

  private fillGrid(): void {
    this.generateGrid();

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let possibleValues = this.alloweNumbers;

        // Удалить значения, которые появляются в одной и той же строке или столбце
        for (let k = 0; k < 9; k++) {
          if (possibleValues.includes(this.grid[i][k].value)) {
            possibleValues = possibleValues.filter((value) => value !== this.grid[i][k].value);
          }
          if (possibleValues.includes(this.grid[k][j].value)) {
            possibleValues = possibleValues.filter((value) => value !== this.grid[k][j].value);
          }
        }

        // Удалить значения, которые появляются в одном и том же квадрате 3x3
        const squareRow = Math.floor(i / 3) * 3;
        const squareCol = Math.floor(j / 3) * 3;
        for (let k = squareRow; k < squareRow + 3; k++) {
          for (let l = squareCol; l < squareCol + 3; l++) {
            if (possibleValues.includes(this.grid[k][l].value)) {
              possibleValues = possibleValues.filter((value) => value !== this.grid[k][l].value);
            }
          }
        }

        // Выберать случайное значение из оставшихся возможных значений
        let randomValue;
        while (possibleValues.length > 0) {
          const randomIndex = Math.floor(Math.random() * possibleValues.length);
          randomValue = possibleValues[randomIndex];
          this.grid[i][j].value = randomValue;

          // Проверить, действительно ли новое значение
          if (this.isValid(i, j)) {
            break;
          } else {
            possibleValues.splice(randomIndex, 1);
          }
        }

        // Backtrack если не было найдено действительное значение
        if (possibleValues.length === 0 && this.grid[i][j].value >= 0) {
          return this.fillGrid();
        }

        // Assign block identifiers based on position within the block
        const blockRow = Math.floor(i / 3);
        const blockCol = Math.floor(j / 3);
        const blockIndex = blockRow * 3 + blockCol;
        this.grid[i][j].block = blockIndex;

        // Set visibility based on difficulty level
        if (this.difficulty === 'easy' && Math.random() < 0.05) {
          this.grid[i][j].isVisible = false;
        } else if (this.difficulty === 'medium' && Math.random() < 0.4) {
          this.grid[i][j].isVisible = false;
        } else if (this.difficulty === 'hard' && Math.random() < 0.5) {
          this.grid[i][j].isVisible = false;
        } else if (this.difficulty === 'expert' && Math.random() < 0.55) {
          this.grid[i][j].isVisible = false;
        } else if (this.difficulty === 'evil' && Math.random() < 0.6) {
          this.grid[i][j].isVisible = false;
        }
      }
    }
  }

  private isValid(row: number, col: number) {
    const { value } = this.grid[row][col];

    // Проверить строку и столбец
    for (let i = 0; i < 9; i++) {
      if (i !== col && this.grid[row][i].value === value) {
        return false;
      }
      if (i !== row && this.grid[i][col].value === value) {
        return false;
      }
    }

    // Проверить квадрат 3х3
    const squareRow = Math.floor(row / 3) * 3;
    const squareCol = Math.floor(col / 3) * 3;
    for (let i = squareRow; i < squareRow + 3; i++) {
      for (let j = squareCol; j < squareCol + 3; j++) {
        if (i !== row && j !== col && this.grid[i][j].value === value) {
          return false;
        }
      }
    }

    return true;
  }
}
