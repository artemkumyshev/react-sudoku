export default class Sudoku {
  private difficulty: DifficultyLevel;

  private size = 9;

  private grid: Cell[][] = [];

  private alloweNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  private percentage = {
    easy: 0.05,
    medium: 0.3,
    hard: 0.4,
    expert: 0.5,
    evil: 0.6
  };

  constructor(difficulty: DifficultyLevel = 'easy') {
    this.difficulty = difficulty;
  }

  public getGrid() {
    this.fillGrid();
    return this.grid;
  }

  private generateGrid() {
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.grid[i][j] = { value: 0, isVisible: true, block: 0 };
      }
    }
  }

  private fillGrid(): void {
    this.generateGrid();

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let possibleValues = this.alloweNumbers;

        // Удалить значения, которые появляются в одной и той же строке или столбце
        for (let k = 0; k < this.size; k++) {
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
      }
    }

    const totalCells = this.size * this.size;
    let cellsToHide = Math.floor(totalCells * this.percentage[this.difficulty]);

    while (cellsToHide > 0) {
      const randomIndex = Math.floor(Math.random() * totalCells);
      const row = Math.floor(randomIndex / this.size);
      const col = randomIndex % this.size;
      if (this.grid[row][col].isVisible) {
        this.grid[row][col].isVisible = false;
        cellsToHide--;
      }
    }
  }

  private isValid(row: number, col: number) {
    const { value } = this.grid[row][col];

    // Проверить строку и столбец
    for (let i = 0; i < this.size; i++) {
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
