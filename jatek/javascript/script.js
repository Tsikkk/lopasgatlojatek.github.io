var szam=null
var szam2=60

function easy(){
    var szam2=20
}
function medium(){
    var szam2=30
}
function hard(){
    var szam2=40
}
function expert(){
    var szam2=50
}
function master(){
    var szam2=60
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
                    currentCell.innerText = szam;
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
        console.log(oBoard);
    }
}
function valt(){
    console.log("asd")

}
function valt2(){
    console.log('asd')
}

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
        }
        
        
    }
}




// Generate and display the Sudoku board
generateSudokuBoard();
