import bluePlayerIcon from "../../assets/icons/blue-player.png";
import orangePlayerIcon from "../../assets/icons/orange-player.png";
import drawIcon from "../../assets/img/gaming-cards/Draw-Icon.png";

import {
    getBlueScore,
    getOrangeScore,
    getSelectedPlayer
} from "./playerState";

export type FinalResult = "win" | "loss" | "draw";

const gamePage = document.getElementById("game-page");
const gameOverPage = document.getElementById("game-over-page");
const resultPage = document.getElementById("result-page");
const resultConfetti = document.getElementById("result-confetti");

const finalBlueScore = document.getElementById("final-blue-score");
const finalOrangeScore = document.getElementById(
    "final-orange-score"
);

const resultMessage = document.getElementById("result-message");
const resultTitle = document.getElementById("result-title");
const resultIcon = document.getElementById(
    "result-icon"
) as HTMLImageElement | null;

function isDraw(): boolean {
    return getBlueScore() === getOrangeScore();
}

function didSelectedPlayerWin(): boolean {
    const selectedPlayer = getSelectedPlayer();

    if (selectedPlayer === "blue") {
        return getBlueScore() > getOrangeScore();
    }

    return getOrangeScore() > getBlueScore();
}

export function getFinalResult(): FinalResult {
    if (isDraw()) {
        return "draw";
    }

    if (didSelectedPlayerWin()) {
        return "win";
    }

    return "loss";
}

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

function showLossScreen(): void {
    if (gameOverPage === null) {
        return;
    }

    updateFinalScores();
    gameOverPage.hidden = false;
}

function prepareWinnerMessage(): void {
    if (resultMessage === null) {
        return;
    }

    resultMessage.textContent = "The winner is";
}

function prepareWinnerTitle(): void {
    if (resultTitle === null) {
        return;
    }

    if (getSelectedPlayer() === "blue") {
        resultTitle.textContent = "BLUE PLAYER";
        resultTitle.className = "result__title result__title--blue";
        return;
    }

    resultTitle.textContent = "ORANGE PLAYER";
    resultTitle.className = "result__title result__title--orange";
}

function prepareWinnerIcon(): void {
    if (resultIcon === null) {
        return;
    }

    if (getSelectedPlayer() === "blue") {
        resultIcon.src = bluePlayerIcon;
        resultIcon.className = "result__icon";
        return;
    }

    resultIcon.src = orangePlayerIcon;
    resultIcon.className = "result__icon";
}

function showConfetti(): void {
    if (resultConfetti === null) {
        return;
    }

    resultConfetti.hidden = false;
}

function prepareWinnerScreen(): void {
    prepareWinnerMessage();
    prepareWinnerTitle();
    prepareWinnerIcon();
    showConfetti();
}

function prepareDrawMessage(): void {
    if (resultMessage === null) {
        return;
    }

    resultMessage.textContent = "It’s a";
}

function prepareDrawTitle(): void {
    if (resultTitle === null) {
        return;
    }

    resultTitle.textContent = "DRAW";
    resultTitle.className = "result__title result__title--draw";
}

function prepareDrawIcon(): void {
    if (resultIcon === null) {
        return;
    }

    resultIcon.src = drawIcon;
    resultIcon.className = "result__icon result__icon--draw";
}

function hideConfetti(): void {
    if (resultConfetti === null) {
        return;
    }

    resultConfetti.hidden = true;
}

function prepareDrawScreen(): void {
    prepareDrawMessage();
    prepareDrawTitle();
    prepareDrawIcon();
    hideConfetti();
}

function gameIsHidden(): boolean {
    if (gamePage === null) {
        return true;
    }

    return Boolean(gamePage.hidden);
}

function hideGamePage(): void {
    if (gamePage === null) {
        return;
    }

    gamePage.hidden = true;
}

function showResultPage(): void {
    if (resultPage === null) {
        return;
    }

    resultPage.hidden = false;
}

function showWinnerScreen(): void {
    prepareWinnerScreen();
    showResultPage();
}

function showDrawScreen(): void {
    prepareDrawScreen();
    showResultPage();
}

function showNonLossResult(finalResult: FinalResult): void {
    if (finalResult === "draw") {
        showDrawScreen();
        return;
    }

    showWinnerScreen();
}

export function showFinalResult(): void {
    if (gameIsHidden()) {
        return;
    }
    const finalResult = getFinalResult();
    hideGamePage();

    if (finalResult === "loss") {
        showLossScreen();
        return;
    }

    showNonLossResult(finalResult);
}

function hideGameOverPage(): void {
    if (gameOverPage === null) {
        return;
    }

    gameOverPage.hidden = true;
}

function hideResultPage(): void {
    if (resultPage === null) {
        return;
    }

    resultPage.hidden = true;
}

export function hideFinalScreens(): void {
    hideGameOverPage();
    hideResultPage();
}