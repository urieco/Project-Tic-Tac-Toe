const gameBoard = (() => {
  let board = [null, null, null, null, null, null, null, null, null];

  //Generate board
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
    if (!document.querySelector(".player1>span").textContent || 
        !document.querySelector(".player2>span").textContent) {
          winnerDisplay.textContent = "Please enter the players' names!"
          return;
        }
    if (winCond() == "WIN" || winCond() == "TIE") return;

    winnerDisplay.textContent = "";

    let turnsLeft = board.filter((el) => el == null).length;

    if (block.textContent) return;

    if (turnsLeft % 2 == 0) {
      board.splice(currentIndex, 1, 0);
      block.textContent = "O";
    } else {
      board.splice(currentIndex, 1, 1);
      block.textContent = "X";
    }

    if (winCond() !== undefined && winCond() !== "UNDECIDED") {
      gameBoard.announceWinner(turnsLeft, winCond());
    }
  };

  const winCond = () => {
    if (board.filter(el => el == null).length > 5) return;

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
        board[n + 3 * 0] == board[n + 3 * 2]
      )
        return "WIN";

      //Row win pattern
      if (board[3 * n] !== null &&
          board[3 * n] == board[3 * n + 1] &&
          board[3 * n] == board[3 * n + 2])
        return "WIN";
    }

    if (board.filter(el => el == null).length!==0) return "UNDECIDED";

    return "TIE";
  };

  const winnerDisplay = document.querySelector(".winner-display");

  const announceWinner = (turnsLeft, result) => {
    const p1Name = player1.getName();
    const p2Name = player2.getName();

    if (result == "WIN" &&
      turnsLeft % 2 == 0) {
      winnerDisplay.textContent = `${p2Name} has won this round!`; //**//
      scoring(2); 
    }
    else if (result == "WIN" && turnsLeft % 2 !== 0) {
      winnerDisplay.textContent = `${p1Name} has won this round!`;
      scoring(1); 
    }

    if (result == "TIE") winnerDisplay.textContent = "It's a tie!";
  }

  let _p1Score = 0;
  let _p2Score = 0;

  const scoring = (win) => {
    const score = document.querySelector(`.player${win}-score`);
    if (win == 1) {
      _p1Score++;
      return score.textContent = _p1Score;
    } 
    if (win == 2) {
      _p2Score++; 
      return score.textContent = _p2Score; 
    }    
  };

  const clearBoard = () => {
    board = [null, null, null, null, null, null, null, null, null];
    document.querySelectorAll(".block").forEach((el) => (el.textContent = ""));
    winnerDisplay.textContent = "";
  };

  const resetScore = () => {
    clearBoard();
    _p1Score = 0; 
    _p2Score = 0;
    document.querySelector(".player1-score").textContent = 0; 
    document.querySelector(".player2-score").textContent = 0; 
};


  document.querySelector("html").addEventListener("keydown", (e) => {
    if (winCond() == undefined || winCond() =="UNDECIDED") return;
    if (e.code === "Enter") return clearBoard(); 
    if (e.code === "KeyR" ) return resetScore();
  });

  return { board, winCond, announceWinner, clearBoard, resetScore};

})();


const Player = (index) => {
  const getName = () => {
    const inputField = document.querySelector(`#player${index}`);
    const nameDisplay = document.querySelector(`.player${index}>span`);

    // Since a global object has to be made (i.e player1, player2), a simple function
    // 'const name =...' won't work. The names are only inputted right after the user 
    // interaction. In this instance, the name of the player has to be taken from two 
    // element's values with constantly switching states. 
    if (inputField) {
      nameDisplay.textContent = inputField.value;
      return inputField.value;
    }
    else return nameDisplay.textContent;
  };

  document.querySelector(`#player${index}`).addEventListener("keydown", (e) => {
    if (e.keyCode == 13 || e.keyCode == 9) getName(index);
  });

  return { getName };
};


const displayController = (() => {
  const instruction = document.querySelector(".instruction");
  const note = document.querySelector(".instruction>span");
  instruction.addEventListener("mouseenter", () => (note.style.display = "block"));
  instruction.addEventListener("mouseleave", () => (note.style.display = "none"));

  const resetBtn = document.querySelector(".reset");
  resetBtn.addEventListener("click", gameBoard.clearBoard);
})();

const player1 = Player(1);
const player2 = Player(2); 
