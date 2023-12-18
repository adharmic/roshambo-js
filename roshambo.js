console.log("Hello, world");

// 0 = Paper
// 1 = Rock
// 2 = Scissors
// Let x = player 1
// Let y = player 2
// If x === y, tie game
// If x === (y - 1) % 3, x wins (using mathematical modulo and not remainder)
// Else, y wins

const ROCK_CHOICE = 1;
const PAPER_CHOICE = 0;
const SCISSORS_CHOICE = 2;

const PLAYER_SCOREBOARD = document.querySelector('.player-score-text');
const COMPUTER_SCOREBOARD = document.querySelector('.computer-score-text');
const ANNOUNCER = document.querySelector('.announcer-text');
const RESTART_BUTTON = document.querySelector('#reset-button');

const PICK_ROCK_BUTTON = document.querySelector("#play-rock");
const PICK_PAPER_BUTTON = document.querySelector("#play-paper");
const PICK_SCISSORS_BUTTON = document.querySelector("#play-scissors");

RESTART_BUTTON.addEventListener("click", restartGame);

let playerScore = 0;
let computerScore = 0;

function updateScoreText() {
    PLAYER_SCOREBOARD.textContent = playerScore;
    COMPUTER_SCOREBOARD.textContent = computerScore;
}

function disableButtons(disabled) {
    PICK_PAPER_BUTTON.disabled = disabled;
    PICK_ROCK_BUTTON.disabled = disabled;
    PICK_SCISSORS_BUTTON.disabled = disabled;
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    ANNOUNCER.textContent = `Choose an option!`;
    updateScoreText();
    disableButtons(false);
}

function gameOver() {
    if (playerScore > computerScore) {
        ANNOUNCER.textContent = "You won! Press restart to play again.";
        if (confirm(`You have beaten the computer! Play again?`)) {
            restartGame();
            return;
        }
        disableButtons(true);
    }
    else {
        ANNOUNCER.textContent = "You lost! Press restart to play again.";
        if (confirm(`The computer has beaten you! Play again?`)) {
            restartGame();
            return;
        }
        disableButtons(true);
    }
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

// Better off creating a 2-way dictionary for the two below methods
function translateChoiceToNum(choice) {
    switch (choice.toLowerCase()) {
        case "paper":
            return 0;
        case "rock":
            return 1;
        default:
            return 2;
    }
}

function translateNumToChoice(choice) {
    switch (choice) {
        case 0:
            return "Paper";
        case 1:
            return "Rock";
        default:
            return "Scissors";
    }
}

function getComputerChoice() {
    return Math.floor((Math.random() * 3));
}

function playRound(playerSelection, computerSelection) {
    ANNOUNCER.textContent = `You have chosen ${translateNumToChoice(playerSelection)}. \n The computer has chosen ${translateNumToChoice(computerSelection)}. `;
    if (playerSelection === computerSelection) {
        ANNOUNCER.textContent += "Tie round! Play again!"
        return;
    }
    if (playerSelection === mod(computerSelection - 1, 3)) {
        ANNOUNCER.textContent += "You win this round!"
        playerScore++;
    }
    else {
        ANNOUNCER.textContent += "The computer wins this round!"
        computerScore++;
    }
    updateScoreText();
    if (playerScore >= 3 || computerScore >= 3) {
        gameOver();
    }
}

PICK_ROCK_BUTTON.addEventListener("click", function () { playRound(ROCK_CHOICE, getComputerChoice()); });
PICK_PAPER_BUTTON.addEventListener("click", function () { playRound(PAPER_CHOICE, getComputerChoice()); });
PICK_SCISSORS_BUTTON.addEventListener("click", function () { playRound(SCISSORS_CHOICE, getComputerChoice()); });