const tabla=document.getElementById("tabla")

var szam=null
var palya=  [["", "", "","", "", "","", "", ""],
            ["", "", "","", "", "","", "", ""],
            ["", "", "","", "", "","", "", ""],
            ["", "", "","", "", "","", "", ""],
            ["", "", "","", "", "","", "", ""],
            ["", "", "","", "", "","", "", ""],
            ["", "", "","", "", "","", "", ""],
            ["", "", "","", "", "","", "", ""],
            ["", "", "","", "", "","", "", ""]]

for (let index = 0; index < 81; index++) {
    
    
}



function one(){
    szam=1
}
function two(){
    szam=2
}
function three(){
    szam=3
}
function four(){
    szam=4
}
function five(){
    szam=5
}
function six(){
    szam=6
}
function seven(){
    szam=7
}
function eight(){
    szam=8
}
function nine(){
    szam=9
}


// Function to generate a solved Sudoku board
function generateSolvedSudoku() {
    const board = [];
    const size = 9;

    // Initialize an empty board
    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i][j] = 0;
      }
    }

    // Solve the Sudoku
    solveSudoku(board);

    return board;
  }

  // Function to solve Sudoku using backtracking
  function solveSudoku(board) {
    const size = 9;

    // Find an empty cell
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
      return true; // No empty cells, Sudoku is solved
    }

    const [row, col] = emptyCell;

    // Try filling the empty cell with values 1 to 9
    for (let num = 1; num <= size; num++) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num;

        // Recursively try to solve the remaining Sudoku
        if (solveSudoku(board)) {
          return true;
        }

        // If the current assignment does not lead to a solution, backtrack
        board[row][col] = 0;
      }
    }

    // No valid value found for the current cell, backtrack
    return false;
  }

  // Function to find an empty cell in the Sudoku board
  function findEmptyCell(board) {
    const size = 9;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null; // No empty cells
  }

  // Function to check if a number can be placed in a specific cell
  function isValid(board, row, col, num) {
    // Check if num is not present in the current row and column
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false;
      }
    }

    // Check if num is not present in the current 3x3 subgrid
    const subgridStartRow = Math.floor(row / 3) * 3;
    const subgridStartCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[subgridStartRow + i][subgridStartCol + j] === num) {
          return false;
        }
      }
    }

    return true; // Valid placement
  }

  // Function to generate a Sudoku board by removing some values
  function generateSudokuBoard(solvedBoard) {
    const size = 9;
    const emptyCells = Math.floor(Math.random() * 20) + 20; // Adjust the number of empty cells as desired

    // Create a deep copy of the solved board
    const board = solvedBoard.map(row => row.slice());

    // Randomly remove values to create the puzzle
    for (let i = 0; i < emptyCells; i++) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (board[row][col] !== 0) {
        board[row][col] = 0;
      } else {
        i--; // Try again if the cell is already empty
      }
    }

    return board;
  }

  // Function to display the Sudoku board on the HTML table
  function displaySudokuBoard(board) {
    const table = document.getElementById("sudokuBoard");
    table.innerHTML = "";

    for (let i = 0; i < 9; i++) {
      const row = table.insertRow(i);
      for (let j = 0; j < 9; j++) {
        const cell = row.insertCell(j);
        cell.textContent = board[i][j] === 0 ? "" : board[i][j];
      }
    }
  }

  // Function to generate and display a new Sudoku puzzle
  function generateSudoku() {
    const solvedBoard = generateSolvedSudoku();
    const puzzleBoard = generateSudokuBoard(solvedBoard);
    displaySudokuBoard(puzzleBoard);
  }

  // Initial generation on page load
  generateSudoku();