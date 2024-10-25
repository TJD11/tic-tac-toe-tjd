const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-cell-index', index);
        cellElement.innerText = cell;

        cellElement.addEventListener('click', handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        status.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        status.innerText = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.innerText = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    status.innerText = `Player ${currentPlayer}'s turn`;
    board.innerHTML = '';
    createBoard();
}

restartButton.addEventListener('click', restartGame);
createBoard();
status.innerText = `Player ${currentPlayer}'s turn`;

