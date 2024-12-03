const cells = document.querySelectorAll("[data-cell]");
const restartButton = document.getElementById("restart-button");
const winnerMessage = document.getElementById("winner-message");

let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle cell clicks
function handleCellClick(e) {
  const cell = e.target;

  if (cell.textContent !== "" || !gameActive) return;

  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    winnerMessage.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    winnerMessage.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Check for a win
function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => cells[index].textContent === player)
  );
}

// Check for a draw
function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

// Restart game
function restartGame() {
  cells.forEach(cell => (cell.textContent = ""));
  currentPlayer = "X";
  gameActive = true;
  winnerMessage.textContent = "";
}

// Add event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
