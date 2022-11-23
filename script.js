const gameBoard = (() => {
  let board = [null, null, null, null, null, null, null, null, null];

  //generate board
  for (let i = 0; i < board.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.setAttribute("data-index", `${i}`);
    block.addEventListener("click", () =>
      placeMarker(block, block.dataset.index)
    );

    const boardArea = document.querySelector(".board");
    boardArea.appendChild(block);
  }

  const placeMarker = (block, currentIndex) => {
    let turnsLeft = board.filter((el) => el == null).length;
    if (block.textContent) return;
    if (winCond() == "WIN") return;
    if (turnsLeft % 2 == 0) {
      board.splice(currentIndex, 1, 0);
      block.textContent = "O";
    } else {
      board.splice(currentIndex, 1, 1);
      block.textContent = "X";
    }
  };

  const winCond = () => {
    if (
      board[4] !== null &&
      ((board[4] == board[0] && board[4] == board[8]) ||
        (board[4] == board[2] && board[4] == board[6]))
    )
      return "WIN";

    for (let n = 0; n < 3; n++) {
      //Column win pattern
      if (
        board[n + 3 * 0] !== null &&
        board[n + 3 * 0] == board[n + 3 * 1] &&
        board[n + 3 * 1] == board[n + 3 * 2]
      )
        return "WIN";

      //Row win pattern
      //XNOR gate
      if (
        board[3 * n] !== null &&
        ~(board[3 * n] ^ board[3 * n + 1]) + 2 &&
        ~(board[3 * n + 1] ^ board[3 * n + 2]) + 2
      )
        return "WIN";
    }
    return "TIE";
  };

  const clearBoard = () => {
    board = [null, null, null, null, null, null, null, null, null];
    document.querySelectorAll(".block").forEach((el) => (el.textContent = ""));
  };
  return { board, winCond, clearBoard };
})();

