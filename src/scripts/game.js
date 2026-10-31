// 1. Select all game cells
const cells = document.querySelectorAll(".cell");

// 2. Create the game board array
let board = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row

  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column

  [0, 4, 8], // Diagonal (top-left to bottom-right)
  [2, 4, 6]  // Diagonal (top-right to bottom-left)
];


// Check if a player has won
function checkWinner() {

  for (const combination of winningCombinations) {

    const [a, b, c] = combination;

    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {

     // Highlight the three winning cells
      cells[a].classList.add("winning-cell");
      cells[b].classList.add("winning-cell");
      cells[c].classList.add("winning-cell");

      return board[a];
    }

  }

  return null;
}

// Update the scoreboard on the page
function updateScoreboard() {
  document.querySelector("#score-x").textContent = scores.X;

  document.querySelector("#score-o").textContent = scores.O;

  document.querySelector("#score-draws").textContent = scores.draws;
}

// Restart the current round
function restartRound() {

  // Clear the board array
  board = ["", "", "", "", "", "", "", "", ""];

  // Clear the marks displayed on the page
  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("winning-cell");
  });

  // Set Player X as the starting player
  currentPlayer = "X";
  updatePlayerIndicator();

  // Allow players to make moves again
  gameOver = false;

  // Reset the game status message
  document.querySelector(".game-status").textContent =
    "Player X's turn";
}

// Reset all player scores
function resetScores() {

  // Set all scores back to zero
  scores = {
    X: 0,
    O: 0,
    draws: 0
  };

  // Update the scoreboard on the page
  updateScoreboard();

}

// Update the active player indicator
function updatePlayerIndicator() {

  // Select both player cards
  const playerX = document.querySelectorAll(".player")[0];
  const playerO = document.querySelectorAll(".player")[1];

  // Highlight the current player's card
  playerX.classList.toggle("active", currentPlayer === "X");
  playerO.classList.toggle("active", currentPlayer === "O");

}


// Select the reset scores button
const resetScoresButton = document.querySelector("#reset-scores-button");

// Listen for clicks on the reset scores button
resetScoresButton.addEventListener("click", resetScores);

// 3. Set the starting player
let currentPlayer = "X";

// Track whether the game has ended
let gameOver = false;

// Track player scores
let scores = {
  X: 0,
  O: 0,
  draws: 0
};

// 4. Check how many cells we have
console.log("Number of cells:", cells.length);

// 5. Display the starting player
console.log("Current player:", currentPlayer);

// 6. Make each cell clickable
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {

    // Don't allow clicking an occupied cell
   if (board[index] !== "" || gameOver) {
      return;
    }

    // Save the current player's mark
    board[index] = currentPlayer;

    // Display the mark inside the cell
    cell.textContent = currentPlayer;

    // Disable the cell after it has been selected
    cell.disabled = true;

    // Check if the current player has won
    const winner = checkWinner();

    if (winner) {
        gameOver = true;

    // Add one point to the winning player
    scores[winner]++;

    // Refresh the scoreboard
    updateScoreboard();

      document.querySelector(".game-status").textContent =
        `Player ${winner} wins!`;

      return;
    }

    // Check if the game is a draw
    if (board.every(cell => cell !== "")) {
    gameOver = true;

    // Add one point to the draw count
    scores.draws++;

    // Refresh the scoreboard
    updateScoreboard();

    document.querySelector(".game-status").textContent =
        "It's a draw!";

    return;
    }

    // Switch to the other player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Update the active player indicator
    updatePlayerIndicator();


    // Update the game status message
    document.querySelector(".game-status").textContent = `Player ${currentPlayer}'s turn`;


  });
});

// Select the restart button
const restartButton = document.querySelector("#restart-button");

// Listen for clicks on the restart button
restartButton.addEventListener("click", restartRound);