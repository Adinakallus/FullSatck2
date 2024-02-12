const cells = document.querySelectorAll('.cell');
const player = 'X';
const computer = 'O';
let currentPlayer = player;
let gameActive = true;

function handleCellClick(index) {
    const cell = cells[index];
    if (cell.textContent !== '' || !gameActive) return;

    // Player's move
    cell.textContent = currentPlayer;

    // Check for win/draw
    if (checkWin(player)) {
        // Player wins
        endGame(player);
    } else if (isDraw()) {
        // Draw
        endGame('Draw');
    } else {
        // Switch to computer's turn
        currentPlayer = computer;
        computerMove();
    }
}

function computerMove() {
    // Choose a random empty cell for computer's move
    let emptyCells = [...cells].filter(cell => cell.textContent === '');
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    randomCell.textContent = currentPlayer;

    // Check for win/draw after computer's move
    if (checkWin(computer)) {
        // Computer wins
        endGame(computer);
    } else if (isDraw()) {
        // Draw
        endGame('Draw');
    } else {
        // Switch to player's turn
        currentPlayer = player;
    }
}

function checkWin(player) {
    // Check rows, columns, and diagonals for win
    return (
        checkRow(0, 1, 2, player) || 
        checkRow(3, 4, 5, player) || 
        checkRow(6, 7, 8, player) || 
        checkRow(0, 3, 6, player) || 
        checkRow(1, 4, 7, player) || 
        checkRow(2, 5, 8, player) || 
        checkRow(0, 4, 8, player) || 
        checkRow(2, 4, 6, player)
    );
}

function checkRow(a, b, c, player) {
    return (
        cells[a].textContent === player && 
        cells[b].textContent === player && 
        cells[c].textContent === player
    );
}

function isDraw() {
    // Check if all cells are filled
    return [...cells].every(cell => cell.textContent !== '');
}

function endGame(result) {
    gameActive = false;
    if (result === 'Draw') {
        // Handle draw
        console.log('It\'s a draw!');
    } else {
        // Handle win
        console.log(`Player ${result} wins!`);
    }
    // Save score to local storage
    // Code to save score...
}

