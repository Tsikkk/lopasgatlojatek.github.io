var boardIsSolved = false;
var szam = 1;
var szam2 = 2;

function easy() {
    szam2 = 20;
    generateSudokuBoard();
    startTimer();
}

function medium() {
    szam2 = 30;
    generateSudokuBoard();
    startTimer();
}

function hard() {
    szam2 = 40;
    generateSudokuBoard();
    startTimer();
}

function expert() {
    szam2 = 50;
    generateSudokuBoard();
    startTimer();
}

function master() {
    szam2 = 60;
    generateSudokuBoard();
    startTimer();
}


function one(){
    if (szam !== null) {
        szam = 1;
    }
}

function two(){
    if (szam !== null) {
        szam = 2;
    }
}
function three(){
    if (szam !== null) {
        szam = 3;
    }
}
function four(){
    if (szam !== null) {
        szam = 4;
    }
}
function five(){
    if (szam !== null) {
        szam = 5;
    }
}
function six(){
    if (szam !== null) {
        szam = 6;
    }
}
function seven(){
    if (szam !== null) {
        szam = 7;
    }
}
function eight(){
    if (szam !== null) {
        szam = 8;
    }
}
function nine(){
    if (szam !== null) {
        szam = 9;
    }
}


var firstRow = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var shuffledFirstRow = firstRow.sort(() => 0.5 - Math.random());
const sudokuBoard=document.getElementById('sudokuBoard')
const taclaT=document.getElementsByClassName('number')
var oBoard=[]
var noBoard=[]




function isValid(board, row, col, num) {
   // Check if the number is not present in the current row, column, and 3x3 quadrant
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num || board[row - row % 3 + Math.floor(i / 3)][col - col % 3 + i % 3] === num) {
            return false;
        }
    }
    return true;
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        oBoard[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }

                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
function checkBoardCorrectness(board) {
    // Check if the board is correctly solved
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== noBoard[i][j]) {
                return false;
            }
        }
    }
    return true;
}

var a = 0;

function generateSudokuBoard() {
    var board = [];

    for (let i = 0; i < 9; i++) {
        board.push([]);
        oBoard.push([]);
        for (let j = 0; j < 9; j++) {
            board[i].push(0);
            oBoard[i].push(0);
        }
    }

    // Fill the first row
    for (let i = 0; i < 9; i++) {
        board[0][i] = shuffledFirstRow[i];
        oBoard[0][i] = shuffledFirstRow[i];
    }

    // Solve the Sudoku board
    if (solveSudoku(board)) {
        remove(board, szam2);
        noBoard = board;

        // Assign IDs to cells based on the board
        for (let i = 0; i < 81; i++) {
            if (board[Math.floor(i / 9)][i % 9] === null) {
                taclaT[i].id = "valt" + a;
                a++;
            }
        }

        // Add event listener to each cell with an ID
        for (let i = 0; i < 81; i++) {
            const currentCell = taclaT[i];
            if (currentCell.id) {
                currentCell.addEventListener('click', function () {
                    // Check if the clicked cell is empty
                    if (board[Math.floor(i / 9)][i % 9] === null) {
                        if (szam !== null) {
                            if (szam !== oBoard[Math.floor(i / 9)][i % 9]) {
                                currentCell.style.backgroundColor = 'red';
                                setTimeout(function () {
                                    currentCell.style.backgroundColor = ''; // Reset color after a short delay
                                }, 1000); // Adjust the delay as needed
                            } else {
                                // Correct number, reset background color
                                currentCell.style.backgroundColor = '';
                            }
        
                            currentCell.innerText = szam;
        
                            // Update valami array
                            valami.push({ row: Math.floor(i / 9), col: i % 9, value: szam });
                            console.log(valami); // Log the updated array
                        }
                    }
                });
            }
        }

        // Create HTML table to display the Sudoku board
        var boardLine = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                boardLine.push(board[i][j]);
            }
        }
        var div = document.createElement("div");
        for (let i = 0; i < 81; i++) {
            if (taclaT[i] == null) {
                taclaT[i].appendChild(div);
            } else {
                taclaT[i].innerHTML = boardLine[i];
            }
        }
        
        
    }
}

var valami=[]
function remove(board,num){
    let randRow=0
    let randCol=0
    let counter=1
    while (counter!=num) {
        randRow=Math.floor(Math.random()*9)
        randCol=Math.floor(Math.random()*9)
        if (board[randRow][randCol]!=0&&board[randRow][randCol]!=null) {
            board[randRow][randCol]=null
            counter++
            
            valami.push(randRow+','+randCol)
        }
        
        
    }
}
console.log(valami)

function checkUserInput() {
    for (let i = 0; i < valami.length; i++) {
        const { row, col, value } = valami[i];
        if (noBoard[row][col] !== value) {
            return false; // User input doesn't match original board
        }
    }
    return true; // User input matches original board
}


// Generate and display the Sudoku board
generateSudokuBoard();



$(document).ready(function(){
    $("#myModal").modal('show');
});
let timerInterval;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    function startTimer() {
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }

        const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        document.getElementById('timerDisplay').innerText = formattedTime;
    }

    function pad(value) {
        return value < 10 ? `0${value}` : value;
    }