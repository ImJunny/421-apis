let board = document.getElementById("board");

let gameState = "---------";
let player = "X";

function render() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    // creates cell and appends to board
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("id", i);
    if (gameState.charAt(i) != "-") {
      let symbol = document.createElement("p");
      symbol.setAttribute("class", "symbol");
      symbol.innerText = gameState.charAt(i);
      cell.appendChild(symbol);
    }

    board.appendChild(cell);
    // give each cell a click

    if (gameState.charAt(i) == "-") {
      cell.addEventListener("click", (e) => {
        if (player == "X") yourTurn(e.target);
      });
    }
  }
}

// check if win or draw
function updateGameState(player) {
  render();
  //if horizontal win
  for (let i = 0; i < 7; i += 3)
    if (gameState.substring(i, i + 3) == player + player + player) {
      endGame("win");
      return;
    }
  //if vertical win
  for (let i = 0; i < 3; i++) {
    if (
      gameState.charAt(i) == player &&
      gameState.charAt(i + 3) == player &&
      gameState.charAt(i + 6) == player
    ) {
      endGame("win");
      return;
    }
  }
  //if diagonal win
  if (
    gameState.charAt(0) == player &&
    gameState.charAt(4) == player &&
    gameState.charAt(8) == player
  ) {
    endGame("win");
    return;
  } else if (
    gameState.charAt(2) == player &&
    gameState.charAt(4) == player &&
    gameState.charAt(6) == player
  ) {
    endGame("win");
    return;
  }

  if (!gameState.includes("-")) endGame("draw");
}

function endGame(condition) {
  //make board display flex to center end message
  board.innerHTML = "";
  board.style.display = "flex";
  board.style.alignItems = "center";
  board.style.justifyContent = "center";
  let message = document.createElement("p");
  if (condition == "win") {
    message.innerText = player + " wins";
  } else {
    message.innerText = "Draw";
  }
  board.appendChild(message);
}

function yourTurn(element) {
  let index = parseInt(element.id);
  if (player == "X") {
    gameState =
      gameState.substring(0, index) + "X" + gameState.substring(index + 1);
    updateGameState(player);
    player = "O";
    setTimeout(theirTurn, 1000);
  }
}

async function theirTurn() {
  let res = await fetch(
    `https://tic-tac-toe-api-psu.onrender.com/api/v1/${gameState}/${player}`
  );
  let data = await res.json();
  let recommendation = data.recommendation;
  gameState =
    gameState.substring(0, recommendation) +
    "O" +
    gameState.substring(recommendation + 1);
  updateGameState(player);
  player = "X";
}

render();
