const options = ["rock", "paper", "scissor"];
let score = {
  you: 0,
  computer: 0
};

function getRandomInt() {
  return Math.floor(Math.random() * 3);
}

const btns = document.querySelectorAll(".options button");
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const playerA = btn.innerText;
    const playerB = options[getRandomInt()];
    compare(playerA, playerB);
  });
});

function compare(player, computer) {
  const won = "YOU WON";
  const lose = "YOU LOST";
  const draw = "DRAW";
  const outcome = {
    "rock": {
      "rock": draw,
      "paper": lose,
      "scissor": won,
    },
    "paper": {
      "rock": won,
      "paper": draw,
      "scissor": lose,
    },
    "scissor": {
      "rock": lose,
      "paper": won,
      "scissor": draw,
    },
  };
  const resultEl = document.querySelector(".hands .result");
  const youScore = document.querySelector(".score .you");
  const computerScore = document.querySelector(".score .computer");

  update(player, computer);
  resultEl.innerText = outcome[player][computer];
  if (outcome[player][computer] == won){
    score.you++;
    youScore.innerText = score.you;
  }else if (outcome[player][computer] == lose){
    score.computer++;
    computerScore.innerText = score.computer;
  }
}
function update(player, computer) {
  const images = {
    "rock": "rock.png",
    "paper": "paper.png",
    "scissor": "scissor.png",
  };

  const playerHand = document.querySelector(".hands .player-hand");
  const computerHand = document.querySelector(".hands .computer-hand");

  playerHand.src = images[player];
  computerHand.src = images[computer];
}
// // Mapping
// // 0 -> rock, 1->paper, 2->scissor
// const options = ["rock", "paper", "scissor"];

// // number
// /**
//  *
//  * @param {number} player1Choice
//  * @param {number} player2Choice
//  * return string player1, player2, draw
//  */
// function whoWon(player1Choice, player2Choice) {
//   /**
//    * 0, 0 => draw
//    * 0, 1 => rock
//    * 0, 2 => scissor
//    * 1, 0 => rock
//    * 1, 1 => draw
//    * 1, 2
//    * 2, 0
//    * 2, 1
//    * 2, 2 => draw
//    */
// }

// function generateComputerChoice() {
//   let a = options[getRandomInt(3)];
//   console.log(a);
// }
// generateComputerChoice();

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }
