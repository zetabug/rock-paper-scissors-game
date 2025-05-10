// Here's the corrected app.js file:

const options = ["rock", "paper", "scissor"];
let score = {
  you: 0,
  computer: 0,
};
const WIN_GREEN = "#6ac475";
const LOSE_RED = "#c4736a";
const DRAW_BLUE = "#5865f2";

// Create audio objects for different game outcomes
// Add error handling for sounds to prevent game from breaking if sound files are missing
const winSound = new Audio("win.mp3");
const loseSound = new Audio("lose.mp3");
const drawSound = new Audio("draw.mp3");
const clickSound = new Audio("click.mp3");

// Function to safely play sounds with error handling
function playSound(sound) {
  try {
    // First reset the sound to the beginning if it's already playing
    sound.pause();
    sound.currentTime = 0;

    // Create a promise that will play the sound
    let playPromise = sound.play();

    // Handle play() promise rejections
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Sound play error: ", error);
        // Sound play failed, but game should continue regardless
      });
    }
  } catch (error) {
    console.log("Sound error: ", error);
    // Game continues even if sound fails
  }
}

const playerHand = document.querySelector(".hands .player-hand");
const computerHand = document.querySelector(".hands .computer-hand");

function getRandomInt() {
  return Math.floor(Math.random() * 3);
}

const btns = document.querySelectorAll(".options button");
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    try {
      // Play click sound when button is pressed
      playSound(clickSound);

      document.querySelector(".hands .player-hand").src = "rock.png";
      document.querySelector(".hands .computer-hand").src = "rock.png";
      playerHand.classList.add("shakePlayer");
      computerHand.classList.add("shakeComputer");
      const playerA = btn.querySelector("label").innerText;
      const playerB = options[getRandomInt()];
      setTimeout(() => compare(playerA, playerB), 1000);
    } catch (error) {
      console.error("Button click error:", error);
    }
  });
});

function compare(player, computer) {
  try {
    const won = "YOU WON";
    const lose = "YOU LOST";
    const resultEl = document.querySelector(".hands .result");
    const youScore = document.querySelector(".score .you");
    const computerScore = document.querySelector(".score .computer");

    if (player == computer) {
      console.log(`${player} is equal to ${computer}`);
      update(player, computer);
      resultEl.style.color = DRAW_BLUE;
      resultEl.innerText = "DRAW";
      playSound(drawSound);
    } else if (player == "rock" && computer == "scissor") {
      console.log(`${player} defeats ${computer}`);
      update(player, computer);
      score.you++;
      resultEl.style.color = WIN_GREEN;
      resultEl.innerText = won;
      youScore.innerText = score.you;
      playSound(winSound);
    } else if (player == "rock" && computer == "paper") {
      console.log(`${player} loses to ${computer}`);
      update(player, computer);
      score.computer++;
      resultEl.style.color = LOSE_RED;
      resultEl.innerText = lose;
      computerScore.innerText = score.computer;
      playSound(loseSound);
    } else if (player == "paper" && computer == "scissor") {
      console.log(`${player} loses to ${computer}`);
      update(player, computer);
      score.computer++;
      resultEl.style.color = LOSE_RED;
      resultEl.innerText = lose;
      computerScore.innerText = score.computer;
      playSound(loseSound);
    } else if (player == "paper" && computer == "rock") {
      console.log(`${player} defeats ${computer}`);
      update(player, computer);
      score.you++;
      resultEl.style.color = WIN_GREEN;
      resultEl.innerText = won;
      youScore.innerText = score.you;
      playSound(winSound);
    } else if (player == "scissor" && computer == "rock") {
      console.log(`${player} loses to ${computer}`);
      update(player, computer);
      score.computer++;
      resultEl.style.color = LOSE_RED;
      resultEl.innerText = lose;
      computerScore.innerText = score.computer;
      playSound(loseSound);
    } else if (player == "scissor" && computer == "paper") {
      console.log(`${player} defeats ${computer}`);
      update(player, computer);
      score.you++;
      resultEl.style.color = WIN_GREEN;
      resultEl.innerText = won;
      youScore.innerText = score.you;
      playSound(winSound);
    }
  } catch (error) {
    console.error("Compare function error:", error);
  }
}

function update(player, computer) {
  try {
    const rock = "rock.png";
    const paper = "paper.png";
    const scissor = "scissor.png";

    // playerHand
    if (player == "rock") {
      playerHand.src = rock;
    } else if (player == "paper") {
      playerHand.src = paper;
    } else if (player == "scissor") {
      playerHand.src = scissor;
    }

    // computerHand
    if (computer == "rock") {
      computerHand.src = rock;
    } else if (computer == "paper") {
      computerHand.src = paper;
    } else if (computer == "scissor") {
      computerHand.src = scissor;
    }

    playerHand.classList.remove("shakePlayer");
    computerHand.classList.remove("shakeComputer");
  } catch (error) {
    console.error("Update function error:", error);
  }
}

// Reset Game Button
const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", () => {
  try {
    playSound(clickSound);

    score.you = 0;
    score.computer = 0;
    document.querySelector(".score .you").innerText = score.you;
    document.querySelector(".score .computer").innerText = score.computer;
    document.querySelector(".hands .result").innerText = "";
    document.querySelector(".hands .player-hand").src = "rock.png";
    document.querySelector(".hands .computer-hand").src = "rock.png";
  } catch (error) {
    console.error("Reset button error:", error);
  }
});
