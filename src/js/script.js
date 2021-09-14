"use strict";

// SELECTORS:
// Players
const player0Panal = document.querySelector("#Player0");
const player1Panal = document.querySelector("#Player1");
const player0Name = document.querySelector(".game__player0-name");
const player1Name = document.querySelector(".game__player1-name");
const winnerName = document.querySelector(".winner-name");
// Points
const player0Points = document.querySelector("#Player0-points");
const player1Points = document.querySelector("#Player1-points");
const player0HighScore = document.querySelector("#Player0-highscore");
const player1HighScore = document.querySelector("#Player1-highscore");
// Bourd
const rulesBox = document.querySelector("#rules");
const Dice = document.querySelector("#dice");
const gameBourd = document.querySelector("#Bourd");
// Buttons
const Play = document.querySelector("#Play");
const Hold = document.querySelector("#Hold");
const Reset = document.querySelector("#Reset");
const Info = document.querySelector("#info");
const exitRules = document.querySelector("#exitRules");
// -------------------------------------------

// SET BOURD HEIGHT
window.onresize = () => {
    gameBourd.style.height =
        document.querySelector("html").clientHeight -
        (player0Panal.clientHeight + player1Panal.clientHeight) +
        "px";
};
// -------------------------------------------

// DECLARATIONS:
let highScores, Points, activePlayer, winScore;
// -------------------------------------------

// Check and Print Winner Name
const printWinnerName = () => {
    if (highScores[0] >= winScore) {
        return player0Name.textContent;
    } else if (highScores[1] >= winScore) {
        return player1Name.textContent;
    }
};
// -------------------------------------------

// GAME ACTIONS:
// Init Game (Instant Invoking)
const initiateGame = () => {
    // Set Game Declarations Values
    highScores = [0, 0]; //array of high score for two players
    Points = 0;
    activePlayer = 0;
    winScore = 100;

    // Set Game Inner Html Values
    player0Points.innerHTML = 0;
    player1Points.innerHTML = 0;
    player0HighScore.innerHTML = 0;
    player1HighScore.innerHTML = 0;

    // Hidden Class Control
    rulesBox.classList.add("hidden");
    Dice.classList.add("hidden");
    Play.classList.remove("hidden", "rotate");
    Hold.classList.remove("hidden", "rotate");
    Reset.classList.add("hidden");
    winnerName.classList.add("hidden");

    // Switch Active Player
    player0Panal.classList.add("player-active");
    player1Panal.classList.remove("player-active");
    gameBourd.classList.remove("bourdWin");
    gameBourd.classList.add("bourdNormal");
};
initiateGame();

// Show Geme Rules Box
const openGameInfo = () => rulesBox.classList.remove("hidden");

// Hide Game Rules Box
const closeGameInfo = () => rulesBox.classList.add("hidden");

// Switch Player Turn
const playerSwitchTurn = () => {
    // Active Player points Reset to zero
    document.querySelector(`#Player${activePlayer}-points`).textContent = 0;
    Points = 0;

    // Switch Players
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Panal.classList.toggle("player-active");
    player1Panal.classList.toggle("player-active");
    Play.classList.toggle("rotate");
    Hold.classList.toggle("rotate");
};

// Player Save Points
const playerSavePoints = () => {
    highScores[activePlayer] += Points;
    document.querySelector(`#Player${activePlayer}-highscore`).textContent =
        highScores[activePlayer];
};

// Player Wen the Game
const playerWinGame = () => {
    Dice.classList.add("hidden");
    Play.classList.add("hidden");
    Hold.classList.add("hidden");
    Reset.classList.remove("hidden");
    winnerName.classList.remove("hidden");
    gameBourd.classList.remove("bourdNormal");
    gameBourd.classList.add("bourdWin");
    winnerName.innerHTML = `${printWinnerName()} won!`;
};
// -------------------------------------------

// GAME MODES:
// Game Playing (Play)
const playMode = () => {
    // 1. Generating Random number between 1 & 6 when play the Dice:
    const generatedDice = Math.trunc(Math.random() * 6) + 1;

    // collecting points that active player getting
    Points += generatedDice;
    document.querySelector(`#Player${activePlayer}-points`).textContent =
        Points;

    // 2. Display Generated Dice (when click Play) :
    Dice.classList.remove("hidden");
    Dice.src = `../public/images/dice-${generatedDice}.png`;

    // 3. save points and switch turn
    if (generatedDice !== 1) {
        Points += generatedDice;
        document.querySelector(`#Player${activePlayer}-points`).textContent =
            Points;
    } else {
        playerSwitchTurn();
    }
};
// -------------------------------------------

// Game Holding (Hold)
const holdMode = () => {
    // 1. Add All Points To Active Player Highscore Panal:
    playerSavePoints();

    // 2. if one player got 100 points or more they wen.
    highScores[activePlayer] >= winScore ? playerWinGame() : playerSwitchTurn();
};
// -------------------------------------------

// GAME BUTTONS FUNCTIONALITIES
// Play:
Play.addEventListener("click", playMode);

// Hold:
Hold.addEventListener("click", holdMode);

// Try again:
Reset.addEventListener("click", initiateGame);

// Open Info:
Info.addEventListener("click", openGameInfo);

// Close Info
exitRules.addEventListener("click", closeGameInfo);
// -------------------------------------------
