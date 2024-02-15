document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let gameActive = true;
    let userData = JSON.parse(localStorage.getItem("currentUser"));
    let userScore = userData ? userData.score : 0;

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    function handleCellClick(event) {
        console.log("Cell clicked"); // Check if this message appears in the console
        const cell = event.target;
        const index = cell.dataset.index;

        if (cell.textContent !== '' || !gameActive) return;

        cell.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            endGame(currentPlayer);
            if (currentPlayer === 'X') {
                userScore += 10;
                updateScore(userScore);
                userData.score = userScore;
                localStorage.setItem("currentUser", JSON.stringify(userData));
            }
        } else if (isDraw()) {
            endGame('Draw');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            computerMove();
        }
    }

    function computerMove() {
        // Choose a random empty cell for the computer's move
        let emptyCells = [...cells].filter(cell => cell.textContent === '');
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCell = emptyCells[randomIndex];
        randomCell.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            endGame(currentPlayer);
        } else if (isDraw()) {
            endGame('Draw');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin(player) {
        // Define winning combinations
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winCombos.some(combo => {
            return combo.every(index => cells[index].textContent === player);
        });
    }

    function isDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    function endGame(result) {
        gameActive = false;
        if (result === 'Draw') {
            alert('It\'s a draw!');
        } else {
            alert(`Player ${result} wins!\nScore: ${userScore}`);
        }
    }

    function updateScore(score) {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = `Score: ${score}`;
    }
});
