import {
    getBlueScore,
    getOrangeScore
} from "./playerState";

const gamePage = document.getElementById("game-page");
const gameOverPage = document.getElementById("game-over-page");
const finalBlueScore = document.getElementById("final-blue-score");
const finalOrangeScore = document.getElementById(
    "final-orange-score"
);

let foundCardCount = 0;
let requiredCardCount = 0;
let gameOverTimeout: number | null = null;

function updateFinalBlueScore(): void {
    if (finalBlueScore === null) {
        return;
    }

    finalBlueScore.textContent = getBlueScore().toString();
}

function updateFinalOrangeScore(): void {
    if (finalOrangeScore === null) {
        return;
    }

    finalOrangeScore.textContent = getOrangeScore().toString();
}

function updateFinalScores(): void {
    updateFinalBlueScore();
    updateFinalOrangeScore();
}

function hideGameOverPage(): void {
    if (gameOverPage === null) {
        return;
    }

    gameOverPage.hidden = true;
}

function clearGameOverTimeout(): void {
    if (gameOverTimeout === null) {
        return;
    }

    window.clearTimeout(gameOverTimeout);
    gameOverTimeout = null;
}

function showGameOverPage(): void {
    gameOverTimeout = null;

    if (gamePage === null || gameOverPage === null || gamePage.hidden) {
        return;
    }

    updateFinalScores();
    gamePage.hidden = true;
    gameOverPage.hidden = false;
}

export function startGameProgress(cardCount: number): void {
    clearGameOverTimeout();
    foundCardCount = 0;
    requiredCardCount = cardCount;
    hideGameOverPage();
}

export function recordFoundPair(): void {
    foundCardCount += 2;

    if (foundCardCount !== requiredCardCount) {
        return;
    }

    gameOverTimeout = window.setTimeout(showGameOverPage, 700);
}
