const cells = document.querySelectorAll('.cell');
const xImg = document.getElementById('x-img');
const oImg = document.getElementById('o-img');
let currentPlayer = 'X';
let gameActive = true;

function handleCellClick(index) {
    const cell = cells[index];
    if (cell.textContent !== '' || !gameActive) return;

    // Player's move
    cell.appendChild(xImg.cloneNode());
    cell.textContent = currentPlayer;

    checkGameStatus();

    if (gameActive) {
        // Computer's move
        const emptyCells = [...cells].filter(cell => cell.textContent === '');
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerCell = emptyCells[randomIndex];
        setTimeout(() => {
            computerCell.appendChild(oImg.cloneNode());
            computerCell.textContent = 'O';
            checkGameStatus();
        }, 1000); // Delay computer's move by 1 second
    }
}
function checkGameStatus() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent &&
            cells[a].textContent !== ''
        ) {
            announceWinner(cells[a].textContent);
            return;
        }
    }

    if ([...cells].every(cell => cell.textContent !== '')) {
        announceWinner('Draw');
        return;
    }
}

function announceWinner(winner) {
    const messageElement = document.getElementById('message');
    if (winner === 'Draw') {
        messageElement.textContent = 'It\'s a draw!';
    } else {
        messageElement.textContent = `${winner} wins!`;
    }
    gameActive = false;
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.innerHTML = ''; // Clear cell contents including images
    });
    document.getElementById('message').textContent = '';
    currentPlayer = 'X';
    gameActive = true;
}
