const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

// Winning combinations (rows, columns, diagonals)
const winningPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Handle user clicks
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick() {
  const index = this.dataset.index;

  // Prevent clicking filled cells or playing after game end
  if (board[index] !== "" || !gameActive) return;

  // Update board and UI
  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  checkGameResult();
}

// Check win or tie
function checkGameResult() {
  let winFound = false;

  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      winFound = true;
      break;
    }
  }

  // If win
  if (winFound) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false; // Stop further moves
    return;
  }

  // If tie
  if (!board.includes("")) {
    statusText.textContent = "It's a Tie! 🤝";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset game for new round
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's Turn";
  cells.forEach(cell => cell.textContent = "");
}
