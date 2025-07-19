    const boardEl = document.getElementById("board");
    const statusEl = document.getElementById("status");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    // Winning combinations
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // Initialize board
    function createBoard() {
      boardEl.innerHTML = "";
      board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.className = "w-24 h-24 bg-gray-800 text-white text-4xl flex items-center justify-center cursor-pointer";
        cell.dataset.index = index;
        cell.onclick = () => handleCellClick(index);
        boardEl.appendChild(cell);
      });
    }

    function handleCellClick(index) {
      if (!gameActive || board[index]) return;

      board[index] = currentPlayer;
      updateBoard();
      if (checkWin()) {
        statusEl.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
      } else if (board.every(cell => cell)) {
        statusEl.textContent = "It's a draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusEl.textContent = `Player ${currentPlayer}'s turn`;
      }
    }

    function updateBoard() {
      document.querySelectorAll("#board div").forEach((cell, i) => {
        cell.textContent = board[i];
      });
    }

    function checkWin() {
      return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
      );
    }

    function resetGame() {
      board = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameActive = true;
      statusEl.textContent = `Player ${currentPlayer}'s turn`;
      createBoard();
    }

    // Start the game
    createBoard();
