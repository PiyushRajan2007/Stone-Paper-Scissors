let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#computer-score");
const resetBtn = document.querySelector("#reset-btn");

const winSound = new Audio(
  "https://www.soundjay.com/misc/sounds/magic-chime-01.mp3",
);
const loseSound = new Audio(
  "https://www.soundjay.com/misc/sounds/fail-trombone-01.mp3",
);
const drawSound = new Audio(
  "https://www.soundjay.com/button/sounds/button-3.mp3",
);

const icons = {
  Rock: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Raised%20Fist.png",
  Paper:
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Raised%20Hand.png",
  Scissors:
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Victory%20Hand.png",
};

const genCompChoice = () => {
  const options = ["Rock", "Paper", "Scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = (userChoice, compChoice) => {
  drawSound.play();
  msg.innerHTML = `Game was Draw. <img src="${icons[userChoice]}"> vs <img src="${icons[compChoice]}">`;
  msg.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  msg.style.color = "#1a2a6c";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    winSound.play();
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerHTML = `You win! Your <img src="${icons[userChoice]}"> beats <img src="${icons[compChoice]}">`;
    msg.style.backgroundColor = "#4CAF50";
    msg.style.color = "white";
  } else {
    loseSound.play();
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerHTML = `You lost. <img src="${icons[compChoice]}"> beats your <img src="${icons[userChoice]}">`;
    msg.style.backgroundColor = "#f44336";
    msg.style.color = "white";
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame(userChoice, compChoice);
  } else {
    let userWin = true;
    if (userChoice === "Rock") {
      userWin = compChoice === "Paper" ? false : true;
    } else if (userChoice === "Paper") {
      userWin = compChoice === "Scissors" ? false : true;
    } else {
      userWin = compChoice === "Rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    choice.classList.add("clicked");
    setTimeout(() => choice.classList.remove("clicked"), 200);
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Pick your weapon!";
  msg.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  msg.style.color = "#1a2a6c";
};

resetBtn.addEventListener("click", resetGame);
