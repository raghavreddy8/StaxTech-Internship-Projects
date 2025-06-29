const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultText = document.getElementById("result-text");

let userScore = 0;
let computerScore = 0;

const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".choice");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const userChoice = button.id;
        const computerChoice = getComputerChoice();
        const result = getResult(userChoice, computerChoice);
        updateUI(userChoice, computerChoice, result);
    });
});

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getResult(user, computer) {
    if (user === computer) return "draw";
    if (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
    ) {
        userScore++;
        return "win";
    } else {
        computerScore++;
        return "lose";
    }
}

function updateUI(user, computer, result) {
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;

    let message = `You chose ${user}, computer chose ${computer}. `;

    if (result === "win") {
        resultText.textContent = message + "You won! 😏😎";
        resultText.style.color = "#00809D";
    } else if (result === "lose") {
        resultText.textContent = message + "You lost! 🤣🤣";
        resultText.style.color = "#b30000";
    } else {
        resultText.textContent = message + "It's a draw! 😮‍💨😮‍💨";
        resultText.style.color = "#666";
    }
}
