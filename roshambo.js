console.log("Hello, world");

// 0 = Paper
// 1 = Rock
// 2 = Scissors
// Let x = player 1
// Let y = player 2
// If x === y, tie game
// If x === (y - 1) % 3, x wins (using mathematical modulo and not remainder)
// Else, y wins

function mod(n, m) {
  return ((n % m) + m) % m;
}

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
    console.log(`You have chosen ${translateNumToChoice(playerSelection)}. \n The computer has chosen ${translateNumToChoice(computerSelection)}.`)
    if (playerSelection === computerSelection) {
        return 0; // TIE GAME
    }
    if (playerSelection === mod(computerSelection - 1, 3)) {
        return 1; // Player wins
    }
    else {
        return 2; // Player loses
    }
}

console.log(playRound(2, 0));

function game() {

    let playerScore = 0;
    let computerScore = 0;
    while (playerScore < 3 && computerScore < 3) {
        let playerChoiceText = prompt('Choose rock, paper, or scissors!');
        let playerChoiceNum = translateChoiceToNum(playerChoiceText);
    
        let computerChoiceNum = getComputerChoice();

        let result = playRound(playerChoiceNum, computerChoiceNum);
        switch (result) {
            case 0:
                console.log("Tie round! Go again!");
                continue;
            case 1:
                console.log(`You win this round! ${translateNumToChoice(playerChoiceNum)} beats ${translateNumToChoice(computerChoiceNum)}.`);
                playerScore++;
                break;
            default:
                console.log(`You lose this round! ${translateNumToChoice(computerChoiceNum)} beats ${translateNumToChoice(playerChoiceNum)}.`);
                computerScore++;
                break;

        }
    }

    console.log(`Final score! \n You: ${playerScore} \n Computer: ${computerScore}`)
    if (playerScore > computerScore) {
        console.log("You have beaten the computer!");
        return;
    }
    console.log("The computer has beaten you!");
}

game();